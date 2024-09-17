import { UserBalance } from '../types/app.user.type';

export function mapToUserBalanceModel(
  id: string,
  user_id: string,
  cash_balance?: number,
  coin_balance?: number,
): UserBalance {
  return {
    id: id,
    user_id: user_id,
    cash_balance: cash_balance ?? 0,
    coin_balance: coin_balance ?? 0
  };
}