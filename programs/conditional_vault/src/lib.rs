use anchor_lang::prelude::*;
use anchor_spl::metadata::{
    create_metadata_accounts_v3, mpl_token_metadata::types::DataV2, CreateMetadataAccountsV3,
    Metadata, MetadataAccount,
};
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Burn, Mint, MintTo, Token, TokenAccount, Transfer},
};
// use mpl_token_metadata::state::DataV2;

pub mod error;
pub mod instructions;
pub mod state;

pub use error::VaultError;
pub use instructions::*;
pub use state::*;

#[cfg(not(feature = "no-entrypoint"))]
use solana_security_txt::security_txt;

#[cfg(not(feature = "no-entrypoint"))]
security_txt! {
    name: "conditional_vault",
    project_url: "https://metadao.fi",
    contacts: "email:metaproph3t@protonmail.com",
    policy: "The market will decide whether we pay a bug bounty.",
    source_code: "https://github.com/metaDAOproject/futarchy",
    source_release: "v0.4",
    auditors: "Neodyme (v0.3)",
    acknowledgements: "DCF = (CF1 / (1 + r)^1) + (CF2 / (1 + r)^2) + ... (CFn / (1 + r)^n)"
}

declare_id!("VAU1T7S5UuEHmMvXtXMVmpEoQtZ2ya7eRb7gcN47wDp");

#[program]
pub mod conditional_vault {
    use super::*;

    pub fn initialize_question(
        ctx: Context<InitializeQuestion>,
        args: InitializeQuestionArgs,
    ) -> Result<()> {
        InitializeQuestion::handle(ctx, args)
    }

    pub fn resolve_question(
        ctx: Context<ResolveQuestion>,
        args: ResolveQuestionArgs,
    ) -> Result<()> {
        ResolveQuestion::handle(ctx, args)
    }

    pub fn initialize_new_conditional_vault<'c: 'info, 'info>(
        ctx: Context<'_, '_, 'c, 'info, InitializeNewConditionalVault<'info>>,
    ) -> Result<()> {
        InitializeNewConditionalVault::handle(ctx)
    }

    pub fn split_tokens<'c: 'info, 'info>(
        ctx: Context<'_, '_, 'c, 'info, InteractWithNewVault<'info>>,
        amount: u64,
    ) -> Result<()> {
        InteractWithNewVault::handle_split_tokens(ctx, amount)
    }

    pub fn merge_tokens<'c: 'info, 'info>(
        ctx: Context<'_, '_, 'c, 'info, InteractWithNewVault<'info>>,
        amount: u64,
    ) -> Result<()> {
        InteractWithNewVault::handle_merge_tokens(ctx, amount)
    }

    #[access_control(ctx.accounts.validate_redeem_tokens())]
    pub fn redeem_tokens<'c: 'info, 'info>(
        ctx: Context<'_, '_, 'c, 'info, InteractWithNewVault<'info>>,
    ) -> Result<()> {
        InteractWithNewVault::handle_redeem_tokens(ctx)
    }

    // pub fn split_tokens()
    // merge tokens

    // redeem tokens

    pub fn initialize_conditional_vault(
        ctx: Context<InitializeConditionalVault>,
        args: InitializeConditionalVaultArgs,
    ) -> Result<()> {
        InitializeConditionalVault::handle(ctx, args)
    }

    #[access_control(ctx.accounts.validate())]
    pub fn add_metadata_to_conditional_tokens(
        ctx: Context<AddMetadataToConditionalTokens>,
        args: AddMetadataToConditionalTokensArgs,
    ) -> Result<()> {
        AddMetadataToConditionalTokens::handle(ctx, args)
    }

    #[access_control(ctx.accounts.validate())]
    pub fn settle_conditional_vault(
        ctx: Context<SettleConditionalVault>,
        new_status: VaultStatus,
    ) -> Result<()> {
        SettleConditionalVault::handle(ctx, new_status)
    }

    #[access_control(ctx.accounts.validate_merge_conditional_tokens())]
    pub fn merge_conditional_tokens_for_underlying_tokens(
        ctx: Context<InteractWithVault>,
        amount: u64,
    ) -> Result<()> {
        InteractWithVault::handle_merge_conditional_tokens(ctx, amount)
    }

    pub fn mint_conditional_tokens(ctx: Context<InteractWithVault>, amount: u64) -> Result<()> {
        InteractWithVault::handle_mint_conditional_tokens(ctx, amount)
    }

    #[access_control(ctx.accounts.validate_redeem_conditional_tokens())]
    pub fn redeem_conditional_tokens_for_underlying_tokens(
        ctx: Context<InteractWithVault>,
    ) -> Result<()> {
        InteractWithVault::handle_redeem_conditional_tokens(ctx)
    }
}
