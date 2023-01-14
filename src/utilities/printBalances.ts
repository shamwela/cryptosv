export function printBalances(balances: Map<string, number>) {
  balances.forEach((value, key) => {
    console.log(`${key} = ${value} USD`)
  })
}
