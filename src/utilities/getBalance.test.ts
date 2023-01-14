import { getBalances } from './getBalances'
import type { Transactions } from './getTransactions'

test('balance', () => {
  const transactions: Transactions = [
    {
      timestamp: '1',
      transaction_type: 'DEPOSIT',
      token: 'BTC',
      amount: '2',
    },
    {
      timestamp: '2',
      transaction_type: 'WITHDRAWAL',
      token: 'BTC',
      amount: '1',
    },
  ]
  const USDRates = new Map([['BTC', 2000]])
  const balances = getBalances(transactions, USDRates)
  const BTCBalance = balances.get('BTC')
  // (2 - 1) * 2,000 = 2,000
  expect(BTCBalance).toBe(2000)
})
