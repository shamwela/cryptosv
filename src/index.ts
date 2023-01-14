#! /usr/bin/env node
import dotenv from 'dotenv'
import { Command } from 'commander'
import { z } from 'zod'
import { getTransactions } from './utilities/getTransactions'
import { getUSDRates } from './utilities/getUSDRates'
import { getBalances } from './utilities/getBalances'
import { printBalances } from './utilities/printBalances'
import { exit } from 'process'

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
  let transactions = await getTransactions()

  if (token) {
    transactions = transactions.filter(
      (transaction) => transaction.token === token
    )
    if (transactions.length === 0) {
      console.log(`"${token}" was not found in your transactions.`)
      exit()
    }
  }

  if (date) {
    const dateInstance = new Date(date)
    try {
      z.date().parse(dateInstance)
    } catch (error) {
      console.error('Invalid date.')
      exit()
    }
    const inputTimestamp = dateInstance.getTime()
    transactions = transactions.filter(
      (transaction) => Number(transaction.timestamp) <= inputTimestamp
    )
    if (transactions.length === 0) {
      console.log(`There was no transaction before ${date}.`)
      exit()
    }
  }
  // This function will fetch only once for each unique token
  const USDRates = await getUSDRates(transactions)
  const balances = getBalances(transactions, USDRates)
  printBalances(balances)
}
main()
