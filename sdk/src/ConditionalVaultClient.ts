import { AnchorProvider, Program, utils } from "@coral-xyz/anchor";
import {
  AddressLookupTableAccount,
  Keypair,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";

import {
  ConditionalVault,
  IDL as ConditionalVaultIDL,
} from "./types/conditional_vault";

import BN from "bn.js";
import {
  CONDITIONAL_VAULT_PROGRAM_ID,
  MPL_TOKEN_METADATA_PROGRAM_ID,
} from "./constants";
import {
  getQuestionAddr,
  getMetadataAddr,
  getVaultAddr,
  getVaultFinalizeMintAddr,
  getVaultRevertMintAddr,
  getConditionalTokenMintAddr,
} from "./utils";
import { MethodsBuilder } from "@coral-xyz/anchor/dist/cjs/program/namespace/methods";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export type CreateVaultClientParams = {
  provider: AnchorProvider;
  conditionalVaultProgramId?: PublicKey;
};

export class ConditionalVaultClient {
  public readonly provider: AnchorProvider;
  public readonly vaultProgram: Program<ConditionalVault>;

  constructor(provider: AnchorProvider, conditionalVaultProgramId: PublicKey) {
    this.provider = provider;
    this.vaultProgram = new Program<ConditionalVault>(
      ConditionalVaultIDL,
      conditionalVaultProgramId,
      provider
    );
  }

  public static createClient(
    createVaultClientParams: CreateVaultClientParams
  ): ConditionalVaultClient {
    let { provider, conditionalVaultProgramId } = createVaultClientParams;

    return new ConditionalVaultClient(
      provider,
      conditionalVaultProgramId || CONDITIONAL_VAULT_PROGRAM_ID
    );
  }

  async fetchQuestion(question: PublicKey) {
    return this.vaultProgram.account.question.fetch(question);
  }

  async fetchVault(vault: PublicKey) {
    return this.vaultProgram.account.newConditionalVault.fetch(vault);
  }

  async getVault(vault: PublicKey) {
    return this.vaultProgram.account.conditionalVault.fetch(vault);
  }

  initializeQuestionIx(
    questionId: number[],
    oracle: PublicKey,
    numConditions: number
  ) {
    //assert(questionId.length == 32);

    const [question] = getQuestionAddr(
      this.vaultProgram.programId,
      questionId,
      oracle,
      numConditions
    );

    return this.vaultProgram.methods
      .initializeQuestion({
        questionId,
        oracle,
        numConditions,
      })
      .accounts({
        question,
      });
  }

  initializeNewVaultIx(
    question: PublicKey,
    underlyingTokenMint: PublicKey,
    numConditions: number
  ): MethodsBuilder<ConditionalVault, any> {
    const [vault] = getVaultAddr(
      this.vaultProgram.programId,
      question,
      underlyingTokenMint
    );

    let conditionalTokenMintAddrs = [];
    for (let i = 0; i < numConditions; i++) {
      const [conditionalTokenMint] = getConditionalTokenMintAddr(
        this.vaultProgram.programId,
        vault,
        i
      );
      conditionalTokenMintAddrs.push(conditionalTokenMint);
    }
    console.log(conditionalTokenMintAddrs);

    const vaultUnderlyingTokenAccount = getAssociatedTokenAddressSync(
      underlyingTokenMint,
      vault,
      true
    );

    return this.vaultProgram.methods
      .initializeNewConditionalVault()
      .accounts({
        vault,
        question,
        underlyingTokenMint,
        vaultUnderlyingTokenAccount,
      })
      .preInstructions([
        createAssociatedTokenAccountIdempotentInstruction(
          this.provider.publicKey,
          vaultUnderlyingTokenAccount,
          vault,
          underlyingTokenMint
        ),
        // SystemProgram.createAccount({
        //   fromPubkey: this.provider.wallet.publicKey,
        //   newAccountPubkey: conditionalReject.publicKey,
        //   lamports: 1000000000,
        //   space: 82,
        //   programId: TOKEN_PROGRAM_ID,
        // }),
      ])
      .remainingAccounts(
        conditionalTokenMintAddrs.map((conditionalTokenMint) => {
          return {
            pubkey: conditionalTokenMint,
            isWritable: true,
            isSigner: false,
          };
        })
      );
  }

  resolveQuestionIx(
    question: PublicKey,
    oracle: Keypair,
    payoutNumerators: number[]
  ) {
    return this.vaultProgram.methods
      .resolveQuestion({
        payoutNumerators,
      })
      .accounts({
        question,
        oracle: oracle.publicKey,
      })
      .signers([oracle]);
  }

  async mintConditionalTokens(
    vault: PublicKey,
    uiAmount: number,
    user?: PublicKey | Keypair
  ) {
    const storedVault = await this.getVault(vault);

    return (
      this.mintConditionalTokensIx(
        vault,
        storedVault.underlyingTokenMint,
        new BN(uiAmount).mul(new BN(10).pow(new BN(storedVault.decimals))),
        user
      )
        // .preInstructions([
        //   createAssociatedTokenAccountIdempotentInstruction(this.provider.publicKey, )
        // ])
        .rpc()
    );
  }

  mintConditionalTokensIx(
    vault: PublicKey,
    underlyingTokenMint: PublicKey,
    amount: BN,
    user?: PublicKey | Keypair
  ) {
    let userPubkey;
    if (!user) {
      userPubkey = this.provider.publicKey;
    } else if (user instanceof Keypair) {
      userPubkey = user.publicKey;
    } else {
      userPubkey = user;
    }

    const [conditionalOnFinalizeTokenMint] = getVaultFinalizeMintAddr(
      this.vaultProgram.programId,
      vault
    );
    const [conditionalOnRevertTokenMint] = getVaultRevertMintAddr(
      this.vaultProgram.programId,
      vault
    );

    let userConditionalOnFinalizeTokenAccount = getAssociatedTokenAddressSync(
      conditionalOnFinalizeTokenMint,
      userPubkey
    );

    let userConditionalOnRevertTokenAccount = getAssociatedTokenAddressSync(
      conditionalOnRevertTokenMint,
      userPubkey
    );

    let ix = this.vaultProgram.methods
      .mintConditionalTokens(amount)
      .accounts({
        authority: userPubkey,
        vault,
        vaultUnderlyingTokenAccount: getAssociatedTokenAddressSync(
          underlyingTokenMint,
          vault,
          true
        ),
        userUnderlyingTokenAccount: getAssociatedTokenAddressSync(
          underlyingTokenMint,
          userPubkey,
          true
        ),
        conditionalOnFinalizeTokenMint,
        userConditionalOnFinalizeTokenAccount,
        conditionalOnRevertTokenMint,
        userConditionalOnRevertTokenAccount,
      })
      .preInstructions([
        createAssociatedTokenAccountIdempotentInstruction(
          userPubkey,
          userConditionalOnFinalizeTokenAccount,
          userPubkey,
          conditionalOnFinalizeTokenMint
        ),
        createAssociatedTokenAccountIdempotentInstruction(
          userPubkey,
          userConditionalOnRevertTokenAccount,
          userPubkey,
          conditionalOnRevertTokenMint
        ),
      ]);
    if (user instanceof Keypair) {
      ix = ix.signers([user]);
    }

    return ix;
  }

  initializeVaultIx(
    settlementAuthority: PublicKey,
    underlyingTokenMint: PublicKey
  ): MethodsBuilder<ConditionalVault, any> {
    const [vault] = getVaultAddr(
      this.vaultProgram.programId,
      settlementAuthority,
      underlyingTokenMint
    );

    const [conditionalOnFinalizeTokenMint] = getVaultFinalizeMintAddr(
      this.vaultProgram.programId,
      vault
    );
    const [conditionalOnRevertTokenMint] = getVaultRevertMintAddr(
      this.vaultProgram.programId,
      vault
    );

    const vaultUnderlyingTokenAccount = getAssociatedTokenAddressSync(
      underlyingTokenMint,
      vault,
      true
    );

    return this.vaultProgram.methods
      .initializeConditionalVault({ settlementAuthority })
      .accounts({
        vault,
        underlyingTokenMint,
        vaultUnderlyingTokenAccount,
        conditionalOnFinalizeTokenMint,
        conditionalOnRevertTokenMint,
      })
      .preInstructions([
        createAssociatedTokenAccountIdempotentInstruction(
          this.provider.publicKey,
          vaultUnderlyingTokenAccount,
          vault,
          underlyingTokenMint
        ),
      ]);
  }

  addMetadataToConditionalTokensIx(
    vault: PublicKey,
    underlyingTokenMint: PublicKey,
    proposalNumber: number,
    onFinalizeUri: string,
    onRevertUri: string
  ) {
    const [underlyingTokenMetadata] = getMetadataAddr(underlyingTokenMint);

    const [conditionalOnFinalizeTokenMint] = getVaultFinalizeMintAddr(
      this.vaultProgram.programId,
      vault
    );
    const [conditionalOnRevertTokenMint] = getVaultRevertMintAddr(
      this.vaultProgram.programId,
      vault
    );

    const [conditionalOnFinalizeTokenMetadata] = getMetadataAddr(
      conditionalOnFinalizeTokenMint
    );

    const [conditionalOnRevertTokenMetadata] = getMetadataAddr(
      conditionalOnRevertTokenMint
    );

    return this.vaultProgram.methods
      .addMetadataToConditionalTokens({
        proposalNumber: new BN(proposalNumber),
        onFinalizeUri,
        onRevertUri,
      })
      .accounts({
        payer: this.provider.publicKey,
        vault,
        underlyingTokenMint,
        underlyingTokenMetadata,
        conditionalOnFinalizeTokenMint,
        conditionalOnRevertTokenMint,
        conditionalOnFinalizeTokenMetadata,
        conditionalOnRevertTokenMetadata,
        tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
      });
  }

  redeemConditionalTokensIx(vault: PublicKey, underlyingTokenMint: PublicKey) {
    const [conditionalOnFinalizeTokenMint] = getVaultFinalizeMintAddr(
      this.vaultProgram.programId,
      vault
    );
    const [conditionalOnRevertTokenMint] = getVaultRevertMintAddr(
      this.vaultProgram.programId,
      vault
    );

    return this.vaultProgram.methods
      .redeemConditionalTokensForUnderlyingTokens()
      .accounts({
        authority: this.provider.publicKey,
        vault,
        vaultUnderlyingTokenAccount: getAssociatedTokenAddressSync(
          underlyingTokenMint,
          vault,
          true
        ),
        userUnderlyingTokenAccount: getAssociatedTokenAddressSync(
          underlyingTokenMint,
          this.provider.publicKey,
          true
        ),
        conditionalOnFinalizeTokenMint,
        userConditionalOnFinalizeTokenAccount: getAssociatedTokenAddressSync(
          conditionalOnFinalizeTokenMint,
          this.provider.publicKey
        ),
        conditionalOnRevertTokenMint,
        userConditionalOnRevertTokenAccount: getAssociatedTokenAddressSync(
          conditionalOnRevertTokenMint,
          this.provider.publicKey
        ),
      });
  }

  mergeConditionalTokensIx(
    vault: PublicKey,
    underlyingTokenMint: PublicKey,
    amount: BN
  ) {
    const [conditionalOnFinalizeTokenMint] = getVaultFinalizeMintAddr(
      this.vaultProgram.programId,
      vault
    );
    const [conditionalOnRevertTokenMint] = getVaultRevertMintAddr(
      this.vaultProgram.programId,
      vault
    );

    return this.vaultProgram.methods
      .mergeConditionalTokensForUnderlyingTokens(amount)
      .accounts({
        authority: this.provider.publicKey,
        vault,
        vaultUnderlyingTokenAccount: getAssociatedTokenAddressSync(
          underlyingTokenMint,
          vault,
          true
        ),
        userUnderlyingTokenAccount: getAssociatedTokenAddressSync(
          underlyingTokenMint,
          this.provider.publicKey,
          true
        ),
        conditionalOnFinalizeTokenMint,
        userConditionalOnFinalizeTokenAccount: getAssociatedTokenAddressSync(
          conditionalOnFinalizeTokenMint,
          this.provider.publicKey
        ),
        conditionalOnRevertTokenMint,
        userConditionalOnRevertTokenAccount: getAssociatedTokenAddressSync(
          conditionalOnRevertTokenMint,
          this.provider.publicKey
        ),
      });
  }

  async initializeVault(
    settlementAuthority: PublicKey,
    underlyingTokenMint: PublicKey
  ): Promise<PublicKey> {
    const [vault] = getVaultAddr(
      this.vaultProgram.programId,
      settlementAuthority,
      underlyingTokenMint
    );

    await this.initializeVaultIx(
      settlementAuthority,
      underlyingTokenMint
    ).rpc();

    return vault;
  }
}
