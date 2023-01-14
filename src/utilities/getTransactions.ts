import csv from 'csvtojson'
import { z } from 'zod'

const transactionSchema = z.array(
  z.object({
    timestamp: z.string(),
    transaction_type: z.enum(['DEPOSIT', 'WITHDRAWAL']),
    // Although there are only 3 types of token in this example CSV file,
    // the real data may include more types.
    // So, just "string" type is used here.
    token: z.string(),
    amount: z.string(),
  })
)

export type Transactions = z.infer<typeof transactionSchema>

export async function getTransactions() {
  const filePath = './test.csv'
  const csvData = await csv().fromFile(filePath)
  const transactions = transactionSchema.parse(csvData)
  return transactions
}