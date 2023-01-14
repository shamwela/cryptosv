# Design decisions

- Used TypeScript instead of JavaScript because it is more maintainable.
- Firstly, I wrote every code in the index.ts file. Then, I created separate functions as seem fit.
- Get the transactions from the CSV file and filter them depending on the user option input(s)
- To fetch as less as possible, the USD exchange rates are fetched only for each unique token.
- Used maps instead of objects because they are easier to set and get. Map is also iterable and fast.
- Added Jest tests for each utility file.
- Added linting with ESLint.
- Added code formatting with Prettier.
- Validated/parsed with Zod to make it more reliable. For example, input date, CSV data, Crypto Compare API response are parsed.
