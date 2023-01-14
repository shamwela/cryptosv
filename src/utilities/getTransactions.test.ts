import { getTransactions } from './getTransactions'

test('transactions', async () => {
  const transactions = await getTransactions()
  expect(transactions.length).toBeGreaterThan(0)
})
