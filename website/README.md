# GoodData.UI website

Install [Node.js](http://nodejs.org) and [Yarn](https://classic.yarnpkg.com)

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
