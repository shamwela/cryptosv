# Design decisions

- Used TypeScript instead of JavaScript because it is more maintainable.
- Input the transactions from the CSV file and filter them depending on the user's input(s)
- External inputs such as the CLI input date, the CSV data, and the Crypto Compare API response are validated with Zod. This provides true type safety.
- To fetch as less as possible, the USD exchange rates are fetched only once for each unique token.
- Used maps instead of objects because they are easier to set and get. Map is also iterable and fast.
- Added Jest tests for each utility file because tests improve maintainability.
- Added linting with ESLint because it helps find and fix code problems.
- Added code formatting with Prettier because it enforces the same code format across the entire project.
- Used pnpm instead of npm because it is [faster](https://pnpm.io/benchmarks) and stricter.

# How to use

1. `npm i -g pnpm`
2. `pnpm i`
3. `pnpm build`
4. Create a `.env` file and add `CRYPTO_COMPARE_API_KEY`
5. Run `pnpm start` or `pnpm start --token <token>` or `pnpm start --date <date>` or add both options
