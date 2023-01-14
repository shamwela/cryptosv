#! /usr/bin/env node
import { Command } from 'commander'
import csv from 'csvtojson'
import { getUSDRate } from './utilities/getUSDRate'
import dotenv from 'dotenv'
import { z } from 'zod'

async function main() {
  dotenv.config()
  const program = new Command()
  program
    .name('cryptosv')
    .version('1.0.0')
    .description('A cryptocurrency CLI')
    .option(
      '-t, --token <token>',
      'Given a token, return the latest portfolio value for that token in USD.'
    )
    .option(
      '-d, --date <date>',
      'Given a date, return the portfolio value per token in USD on that date.'
    )
    .parse(process.argv)
  type Options = {
    token?: string
    date?: string
  }
  const options: Options = program.opts()
  const token = options.token?.toUpperCase()
  const { date } = options
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
  type Transactions = z.infer<typeof transactionSchema>
  let transactions: Transactions = []
  try {
    const csvData = await csv().fromFile('./test.csv')
    // Parse to make sure the CSV data is correct
    transactions = transactionSchema.parse(csvData)
  } catch (error) {
    console.error(error)
    return
  }

  if (token) {
    transactions = transactions.filter(
      (transaction) => transaction.token === token
    )
    if (transactions.length === 0) {
      console.log(`"${token}" was not found in your transactions.`)
      return
    }
  }

  if (date) {
    const dateInstance = new Date(date)
    try {
      z.date().parse(dateInstance)
    } catch (error) {
      console.error('Invalid date.')
      return
    }
    const inputTimestamp = dateInstance.getTime()
    transactions = transactions.filter(
      (transaction) => Number(transaction.timestamp) <= inputTimestamp
    )
    if (transactions.length === 0) {
      console.log(`There was no transaction before ${date}.`)
      return
    }
  }

  // Token name is string
  // Balance is number
  const balanceMap = new Map<string, number>()
  for (const transaction of transactions) {
    const { transaction_type, token, amount } = transaction
    const currentBalance = balanceMap.get(token) || 0

    const USDRate = await getUSDRate(token)
    const amountInUSD = Number(amount) * USDRate
    let nextBalance: number
    if (transaction_type === 'DEPOSIT') {
      nextBalance = currentBalance + amountInUSD
    } else {
      // WITHDRAWAL
      nextBalance = currentBalance - amountInUSD
    }
    balanceMap.set(token, nextBalance)
  }

  // Convert the map to an array of objects
  const balances = Array.from(balanceMap, ([token, balance]) => ({
    token,
    balance,
  }))

  balances.forEach(({ token, balance }) =>
    console.log(`${token} = ${balance} USD`)
  )
}
main()
