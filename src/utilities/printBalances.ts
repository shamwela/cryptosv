export function printBalances(balances: Map<string, number>) {
  balances.forEach((value, key) => {
    const tokenName = key
    const balance = value
    console.log(`${tokenName} = ${balance} USD`)
  })
}
