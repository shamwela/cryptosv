import axios from 'axios'
import { z } from 'zod'

export async function getUSDRate(token: string) {
  const cryptoCompareApiKey = process.env.CRYPTO_COMPARE_API_KEY as string
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=USD&api_key=${cryptoCompareApiKey}`
  try {
    const { data } = await axios.get(url)
    // Should parse the response data
    const responseDataSchema = z.object({
      USD: z.number(),
    })
    const { USD } = responseDataSchema.parse(data)
    return USD
  } catch (error) {
    console.error('Server error.')
    throw error
  }
}
