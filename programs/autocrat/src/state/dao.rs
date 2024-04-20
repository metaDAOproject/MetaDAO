pub use super::*;

#[account]
pub struct DAO {
    pub treasury_pda_bump: u8,
    pub treasury: Pubkey,
    pub token_mint: Pubkey,
    pub usdc_mint: Pubkey,
    pub proposal_count: u32,
    pub last_proposal_slot: u64,
    // the percentage, in basis points, the pass price needs to be above the
    // fail price in order for the proposal to pass
    pub pass_threshold_bps: u16,
    // for anti-spam, proposers need to burn some SOL. the amount that they need
    // to burn is inversely proportional to the amount of time that has passed
    // since the last proposal.
    // burn_amount = base_lamport_burn - (lamport_burn_decay_per_slot * slots_passed)
    pub base_burn_lamports: u64,
    pub burn_decay_per_slot_lamports: u64,
    pub slots_per_proposal: u64,
    pub market_taker_fee: i64,
    // the TWAP can only move by a certain amount per update, so it needs to start at
    // a value. that's `twap_expected_value`, and it's in base lots divided by quote lots.
    // so if you expect your token to trade around $1, your token has 9 decimals and a base_lot_size
    // of 1_000_000_000, your `twap_expected_value` could be 10_000 (10,000 hundredths of pennies = $1).
    pub twap_expected_value: u64,
    pub max_observation_change_per_update_lots: u64,
    // amount of base tokens that constitute a lot. for example, if TOKEN has
    // 9 decimals, then if lot size was 1_000_000_000 you could trade in increments
    // of 1 TOKEN. ideally, you want to pick a lot size where each lot is worth $1 - $10.
    // this balances spam-prevention with allowing users to trade small amounts.
    pub base_lot_size: i64,
}

