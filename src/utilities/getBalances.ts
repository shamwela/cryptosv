import type { Transactions } from './getTransactions'

export function getBalances(
  transactions: Transactions,
  USDRates: Map<string, number>
) {
  // Token name is string
  // Balance is number
  const balances = new Map<string, number>()
  transactions.forEach((transaction) => {
    const { token, amount, transaction_type } = transaction
    const currentBalance = balances.get(token) || 0
    const USDRate = USDRates.get(token)
    if (!USDRate) {
      throw new Error(`USD rate for ${token} was not found.`)
    }
    const amountInUSD = Number(amount) * USDRate
    let newBalance: number
    if (transaction_type === 'DEPOSIT') {
      newBalance = currentBalance + amountInUSD
    } else {
      // WITHDRAWAL
      newBalance = currentBalance - amountInUSD
    }
    balances.set(token, newBalance)
  })
  return balances
}
