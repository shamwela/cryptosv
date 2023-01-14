import axios from 'axios'
import { z } from 'zod'
import type { Transactions } from './getTransactions'
import { exit } from 'process'

export async function getUSDRates(transactions: Transactions) {
  const tokens = transactions.map((transaction) => transaction.token)
  const uniqueTokens = [...new Set(tokens)]
  const USDRates = new Map<string, number>()
  for (const token of uniqueTokens) {
    const USDRate = await getUSDRate(token)
    USDRates.set(token, USDRate)
  }
  return USDRates
}

async function getUSDRate(token: string) {
  const cryptoCompareApiKey = process.env.CRYPTO_COMPARE_API_KEY as string
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=USD&api_key=${cryptoCompareApiKey}`
  try {
    const { data } = await axios.get(url)
    const USDSchema = z.object({
      USD: z.number().positive().finite(),
    })
    const { USD } = USDSchema.parse(data)
    return USD
  } catch (error) {
    console.error('Server error.')
    exit()
  }
}
