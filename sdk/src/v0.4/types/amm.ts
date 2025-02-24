/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/amm.json`.
 */
export type Amm = {
  address: "AMMyu265tkBpRW21iGQxKGLaves3gKm2JcMUqfXNSpqD";
  metadata: {
    name: "amm";
    version: "0.4.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "addLiquidity";
      discriminator: [181, 157, 89, 67, 143, 182, 52, 72];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "amm";
          writable: true;
        },
        {
          name: "lpMint";
          writable: true;
          relations: ["amm"];
        },
        {
          name: "userLpAccount";
          writable: true;
        },
        {
          name: "userBaseAccount";
          writable: true;
        },
        {
          name: "userQuoteAccount";
          writable: true;
        },
        {
          name: "vaultAtaBase";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "amm";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "amm.base_mint";
                account: "amm";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "vaultAtaQuote";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "amm";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "amm.quote_mint";
                account: "amm";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "eventAuthority";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ];
              }
            ];
          };
        },
        {
          name: "program";
        }
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "addLiquidityArgs";
            };
          };
        }
      ];
    },
    {
      name: "crankThatTwap";
      discriminator: [220, 100, 25, 249, 0, 92, 195, 193];
      accounts: [
        {
          name: "amm";
          writable: true;
        },
        {
          name: "eventAuthority";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ];
              }
            ];
          };
        },
        {
          name: "program";
        }
      ];
      args: [];
    },
    {
      name: "createAmm";
      discriminator: [242, 91, 21, 170, 5, 68, 125, 64];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "amm";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 109, 109, 95, 95];
              },
              {
                kind: "account";
                path: "baseMint";
              },
              {
                kind: "account";
                path: "quoteMint";
              }
            ];
          };
        },
        {
          name: "lpMint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 109, 109, 95, 108, 112, 95, 109, 105, 110, 116];
              },
              {
                kind: "account";
                path: "amm";
              }
            ];
          };
        },
        {
          name: "baseMint";
        },
        {
          name: "quoteMint";
        },
        {
          name: "vaultAtaBase";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "amm";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "baseMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "vaultAtaQuote";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "amm";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "quoteMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "eventAuthority";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ];
              }
            ];
          };
        },
        {
          name: "program";
        }
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "createAmmArgs";
            };
          };
        }
      ];
    },
    {
      name: "removeLiquidity";
      discriminator: [80, 85, 209, 72, 24, 206, 177, 108];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "amm";
          writable: true;
        },
        {
          name: "lpMint";
          writable: true;
          relations: ["amm"];
        },
        {
          name: "userLpAccount";
          writable: true;
        },
        {
          name: "userBaseAccount";
          writable: true;
        },
        {
          name: "userQuoteAccount";
          writable: true;
        },
        {
          name: "vaultAtaBase";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "amm";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "amm.base_mint";
                account: "amm";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "vaultAtaQuote";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "amm";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "amm.quote_mint";
                account: "amm";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "eventAuthority";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ];
              }
            ];
          };
        },
        {
          name: "program";
        }
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "removeLiquidityArgs";
            };
          };
        }
      ];
    },
    {
      name: "swap";
      discriminator: [248, 198, 158, 145, 225, 117, 135, 200];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "amm";
          writable: true;
        },
        {
          name: "userBaseAccount";
          writable: true;
        },
        {
          name: "userQuoteAccount";
          writable: true;
        },
        {
          name: "vaultAtaBase";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "amm";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "amm.base_mint";
                account: "amm";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "vaultAtaQuote";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "amm";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "amm.quote_mint";
                account: "amm";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "eventAuthority";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ];
              }
            ];
          };
        },
        {
          name: "program";
        }
      ];
      args: [
        {
          name: "args";
          type: {
            defined: {
              name: "swapArgs";
            };
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "amm";
      discriminator: [143, 245, 200, 17, 74, 214, 196, 135];
    }
  ];
  events: [
    {
      name: "addLiquidityEvent";
      discriminator: [27, 178, 153, 186, 47, 196, 140, 45];
    },
    {
      name: "crankThatTwapEvent";
      discriminator: [151, 40, 1, 219, 150, 58, 199, 212];
    },
    {
      name: "createAmmEvent";
      discriminator: [87, 213, 21, 39, 67, 210, 139, 177];
    },
    {
      name: "removeLiquidityEvent";
      discriminator: [141, 199, 182, 123, 159, 94, 215, 102];
    },
    {
      name: "swapEvent";
      discriminator: [64, 198, 205, 232, 38, 8, 113, 226];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "assertFailed";
      msg: "An assertion failed";
    },
    {
      code: 6001;
      name: "noSlotsPassed";
      msg: "Can't get a TWAP before some observations have been stored";
    },
    {
      code: 6002;
      name: "noReserves";
      msg: "Can't swap through a pool without token reserves on either side";
    },
    {
      code: 6003;
      name: "inputAmountOverflow";
      msg: "Input token amount is too large for a swap, causes overflow";
    },
    {
      code: 6004;
      name: "addLiquidityCalculationError";
      msg: "Add liquidity calculation error";
    },
    {
      code: 6005;
      name: "decimalScaleError";
      msg: "Error in decimal scale conversion";
    },
    {
      code: 6006;
      name: "sameTokenMints";
      msg: "You can't create an AMM pool where the token mints are the same";
    },
    {
      code: 6007;
      name: "swapSlippageExceeded";
      msg: "A user wouldn't have gotten back their `output_amount_min`, reverting";
    },
    {
      code: 6008;
      name: "insufficientBalance";
      msg: "The user had insufficient balance to do this";
    },
    {
      code: 6009;
      name: "zeroLiquidityRemove";
      msg: "Must remove a non-zero amount of liquidity";
    },
    {
      code: 6010;
      name: "zeroLiquidityToAdd";
      msg: "Cannot add liquidity with 0 tokens on either side";
    },
    {
      code: 6011;
      name: "zeroMinLpTokens";
      msg: "Must specify a non-zero `min_lp_tokens` when adding to an existing pool";
    },
    {
      code: 6012;
      name: "addLiquiditySlippageExceeded";
      msg: "LP wouldn't have gotten back `lp_token_min`";
    },
    {
      code: 6013;
      name: "addLiquidityMaxBaseExceeded";
      msg: "LP would have spent more than `max_base_amount`";
    },
    {
      code: 6014;
      name: "insufficientQuoteAmount";
      msg: "`quote_amount` must be greater than 100000000 when initializing a pool";
    },
    {
      code: 6015;
      name: "zeroSwapAmount";
      msg: "Users must swap a non-zero amount";
    },
    {
      code: 6016;
      name: "constantProductInvariantFailed";
      msg: "K should always be increasing";
    },
    {
      code: 6017;
      name: "castingOverflow";
      msg: "Casting has caused an overflow";
    }
  ];
  types: [
    {
      name: "addLiquidityArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "quoteAmount";
            docs: ["How much quote token you will deposit to the pool"];
            type: "u64";
          },
          {
            name: "maxBaseAmount";
            docs: ["The maximum base token you will deposit to the pool"];
            type: "u64";
          },
          {
            name: "minLpTokens";
            docs: ["The minimum LP token you will get back"];
            type: "u64";
          }
        ];
      };
    },
    {
      name: "addLiquidityEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "common";
            type: {
              defined: {
                name: "commonFields";
              };
            };
          },
          {
            name: "quoteAmount";
            type: "u64";
          },
          {
            name: "maxBaseAmount";
            type: "u64";
          },
          {
            name: "minLpTokens";
            type: "u64";
          },
          {
            name: "baseAmount";
            type: "u64";
          },
          {
            name: "lpTokensMinted";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "amm";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "createdAtSlot";
            type: "u64";
          },
          {
            name: "lpMint";
            type: "pubkey";
          },
          {
            name: "baseMint";
            type: "pubkey";
          },
          {
            name: "quoteMint";
            type: "pubkey";
          },
          {
            name: "baseMintDecimals";
            type: "u8";
          },
          {
            name: "quoteMintDecimals";
            type: "u8";
          },
          {
            name: "baseAmount";
            type: "u64";
          },
          {
            name: "quoteAmount";
            type: "u64";
          },
          {
            name: "oracle";
            type: {
              defined: {
                name: "twapOracle";
              };
            };
          },
          {
            name: "seqNum";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "commonFields";
      type: {
        kind: "struct";
        fields: [
          {
            name: "slot";
            type: "u64";
          },
          {
            name: "unixTimestamp";
            type: "i64";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "amm";
            type: "pubkey";
          },
          {
            name: "postBaseReserves";
            type: "u64";
          },
          {
            name: "postQuoteReserves";
            type: "u64";
          },
          {
            name: "oracleLastPrice";
            type: "u128";
          },
          {
            name: "oracleLastObservation";
            type: "u128";
          },
          {
            name: "oracleAggregator";
            type: "u128";
          },
          {
            name: "seqNum";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "crankThatTwapEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "common";
            type: {
              defined: {
                name: "commonFields";
              };
            };
          }
        ];
      };
    },
    {
      name: "createAmmArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "twapInitialObservation";
            type: "u128";
          },
          {
            name: "twapMaxObservationChangePerUpdate";
            type: "u128";
          }
        ];
      };
    },
    {
      name: "createAmmEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "common";
            type: {
              defined: {
                name: "commonFields";
              };
            };
          },
          {
            name: "twapInitialObservation";
            type: "u128";
          },
          {
            name: "twapMaxObservationChangePerUpdate";
            type: "u128";
          },
          {
            name: "lpMint";
            type: "pubkey";
          },
          {
            name: "baseMint";
            type: "pubkey";
          },
          {
            name: "quoteMint";
            type: "pubkey";
          },
          {
            name: "vaultAtaBase";
            type: "pubkey";
          },
          {
            name: "vaultAtaQuote";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "removeLiquidityArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "lpTokensToBurn";
            type: "u64";
          },
          {
            name: "minQuoteAmount";
            type: "u64";
          },
          {
            name: "minBaseAmount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "removeLiquidityEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "common";
            type: {
              defined: {
                name: "commonFields";
              };
            };
          },
          {
            name: "lpTokensBurned";
            type: "u64";
          },
          {
            name: "minQuoteAmount";
            type: "u64";
          },
          {
            name: "minBaseAmount";
            type: "u64";
          },
          {
            name: "baseAmount";
            type: "u64";
          },
          {
            name: "quoteAmount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "swapArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "swapType";
            type: {
              defined: {
                name: "swapType";
              };
            };
          },
          {
            name: "inputAmount";
            type: "u64";
          },
          {
            name: "outputAmountMin";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "swapEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "common";
            type: {
              defined: {
                name: "commonFields";
              };
            };
          },
          {
            name: "inputAmount";
            type: "u64";
          },
          {
            name: "outputAmount";
            type: "u64";
          },
          {
            name: "swapType";
            type: {
              defined: {
                name: "swapType";
              };
            };
          }
        ];
      };
    },
    {
      name: "swapType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "buy";
          },
          {
            name: "sell";
          }
        ];
      };
    },
    {
      name: "twapOracle";
      type: {
        kind: "struct";
        fields: [
          {
            name: "lastUpdatedSlot";
            type: "u64";
          },
          {
            name: "lastPrice";
            docs: [
              "A price is the number of quote units per base unit multiplied by 1e12.",
              "You cannot simply divide by 1e12 to get a price you can display in the UI",
              "because the base and quote decimals may be different. Instead, do:",
              "ui_price = (price * (10**(base_decimals - quote_decimals))) / 1e12"
            ];
            type: "u128";
          },
          {
            name: "lastObservation";
            docs: [
              "If we did a raw TWAP over prices, someone could push the TWAP heavily with",
              "a few extremely large outliers. So we use observations, which can only move",
              "by `max_observation_change_per_update` per update."
            ];
            type: "u128";
          },
          {
            name: "aggregator";
            docs: [
              "Running sum of slots_per_last_update * last_observation.",
              "",
              "Assuming latest observations are as big as possible (u64::MAX * 1e12),",
              "we can store 18 million slots worth of observations, which turns out to",
              "be ~85 days worth of slots.",
              "",
              "Assuming that latest observations are 100x smaller than they could theoretically",
              "be, we can store 8500 days (23 years) worth of them. Even this is a very",
              "very conservative assumption - META/USDC prices should be between 1e9 and",
              "1e15, which would overflow after 1e15 years worth of slots.",
              "",
              "So in the case of an overflow, the aggregator rolls back to 0. It's the",
              "client's responsibility to sanity check the assets or to handle an",
              "aggregator at T2 being smaller than an aggregator at T1."
            ];
            type: "u128";
          },
          {
            name: "maxObservationChangePerUpdate";
            docs: ["The most that an observation can change per update."];
            type: "u128";
          },
          {
            name: "initialObservation";
            docs: ["What the initial `latest_observation` is set to."];
            type: "u128";
          }
        ];
      };
    }
  ];
};
