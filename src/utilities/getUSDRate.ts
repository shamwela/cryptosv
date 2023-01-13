import axios from 'axios'

export async function getUSDRate(token: string) {
  const cryptoCompareApiKey = process.env.CRYPTO_COMPARE_API_KEY
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=USD&api_key=${cryptoCompareApiKey}`
  try {
    const { data } = await axios.get(url)
    return data.USD as number
  } catch (error) {
    console.error('Error occurred.')
    throw error
  }
}
