import csv from 'csvtojson'
import { z } from 'zod'
import { exit } from 'process'

const transactionSchema = z.array(
  z.object({
    timestamp: z.string(),
    transaction_type: z.enum(['DEPOSIT', 'WITHDRAWAL']),
    // Although there are only 3 types of token in this example CSV file,
    // the real data may include more types.
    // So, just "string" type is used here.
    token: z.string().max(10),
    amount: z.string(),
  })
)
export type Transactions = z.infer<typeof transactionSchema>
export async function getTransactions() {
  const filePath = './test.csv' // relative to where the CLI will run
  let transactions: Transactions = []
  try {
    const csvData = await csv().fromFile(filePath)
    transactions = transactionSchema.parse(csvData)
  } catch (error) {
    console.error(`The CSV file at "${filePath}" is invalid.`)
    exit()
  }
  if (transactions.length === 0) {
    console.error(`The CSV file at "${filePath}" is empty.`)
    exit()
  }
  return transactions
}
