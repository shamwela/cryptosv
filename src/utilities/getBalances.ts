import type { Transactions } from './getTransactions'

export function getBalances(
  transactions: Transactions,
  USDRates: Map<string, number>
) {
  // Token name is string
  // Balance is number
  const balances = new Map<string, number>()
  transactions.forEach((transaction) => {
    const { transaction_type, token, amount } = transaction
    const currentBalance = balances.get(token) || 0
    const USDRate = USDRates.get(token)

    if (!USDRate) {
      throw new Error('Server error')
    }

    const amountInUSD = Number(amount) * USDRate
    let nextBalance: number
    if (transaction_type === 'DEPOSIT') {
      nextBalance = currentBalance + amountInUSD
    } else {
      // WITHDRAWAL
      nextBalance = currentBalance - amountInUSD
    }
    balances.set(token, nextBalance)
  })
  return balances
}
