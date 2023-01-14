import type { Transactions } from './getTransactions'
import { getUSDRates } from './getUSDRates'

test('USDRates', async () => {
  const firstSampleToken = 'BTC'
  const secondSampleToken = 'ETH'
  const sampleTransactions: Transactions = [
    {
      timestamp: '1',
      transaction_type: 'DEPOSIT',
      token: firstSampleToken,
      amount: '1',
    },
    {
      timestamp: '2',
      transaction_type: 'DEPOSIT',
      token: firstSampleToken,
      amount: '1',
    },
    {
      timestamp: '3',
      transaction_type: 'WITHDRAWAL',
      token: secondSampleToken,
      amount: '1',
    },
  ]
  const USDRates = await getUSDRates(sampleTransactions)
  // Since there are 2 unique token types in the sample transactions
  expect(USDRates.size).toBe(2)
  expect(USDRates.get(firstSampleToken)).toBeGreaterThan(0)
  expect(USDRates.get(secondSampleToken)).toBeGreaterThan(0)
})
