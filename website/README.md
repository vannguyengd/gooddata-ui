# GoodData.UI website

Install [Node.js](http://nodejs.org) (node 12.16.1, npm v6.13.4) and [Yarn](https://classic.yarnpkg.com) 1.22.4.

Install dependencies:
```
yarn install --frozen-lockfile
```

## Offline access to documentation website

To launch documentation locally:

```bash
cd website
yarn install
yarn start
open http://localhost:3000/
```

Validate that there are no dead-links:
```
yarn start
yarn validate-links
```