## Bank Details Verification API

### Introduction

This API implements a new feature for an application: that allows users add their bank accounts by providing their **bank account number**, selecting a **bank name**, and writing their **name** as registered with their banks.

## Levenshtein Distance Algorithm

The pure **Levenshtein Distance algorithm** is more effective than the **Damerau-Levenshtein Distance algorithm** in this specific application due to the need for stricter comparison between the account names inputted. In addition to insertions, deletions, and substitutions, the Damerau-Levenshtein algorithm also takes into account transpositions as a valid edit operation. This may make the application allow greater differences between the two account names taken into consideration when determining a match.

For example the names **'John Doe'** and **'Jonh Joe'** would be pass the (maximum distance of 2) check if we use Damerau-Levenshtein distance due to transposition.

## Major Assumptions

The major assumption in this application is that the api is being accessed by a registered user. This implies that for the mutation and queries, along with the details needed, an Id that represents the user must also be provided. This is implemented in order to properly verify user accounts and add Bank Details.
A mutation for registering a user is also provided.

This api was developed using

-   NodeJs
-   Sequelize ORM (PostgreSQL database)
-   Express
-   GraphQL
-   Apollo Server
-   Axios
-   TypeScript

## Getting Started

### Prerequisites

The tools listed below are needed to run this application to run effectively:

-   Node (LTS Version)
-   Npm v8.3.1 or above

You can check the Node.js and npm versions by running the following commands.

### Check node.js version

`node -v`

### Check npm version

`npm -v`

## Installation

-   Install project dependencies by running `npm install`.

-   To compile kindly use `npm postinstall`

-   Start the server with `npm start`

-   Access endpoints on your desired localhost set port

## Run the tests

```shell
npm run test
```

All tests are written in the `src/test` directory.

# GRAPHQL API

The base URL is

    http://localhost/grapghl/

The base URL for the live version is

    https://backdrop-graphql-api.onrender.com/graphql

## API collection

You [click here](https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fbackdrop-graphql-api.onrender.com%2Fgraphql&explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeAFACQDmCKAglFBDKgHICGiAIsys%2BgAQDilGnQYoW7TswCUPYAB0kPHhWq16TVgiLKha0Ro5de5QapFiEBqfIC%2B8%2BXBhcUASwhJSMAM75zvAMooeM5IZACEknIKPFB4CJwIAKreeERePhpGaXjm0pGKis5g8vk8WQD6SBrF%2BcymqBVVUYq1wvVI8ABG%2BNWKHcxIANZldGAIPTzOnmUAbvjOAGbOCEVRtkhrdkgOTq4KVGBgAEL9A2yUzM4ANp6kfYNnXFeevMf350-hMtXMB6%2Bn79ciHd-o9rkZgQ8LtdcuNCuMWroGoh4XUUBVOt0mjxgcMIKNYVNZkFFstqms1iAADQgabMILMDqXBCeDAgOR4aqyEBZcxc3hchAAdwgcGYXMpsg5US5EIBnj5XylJS5cIwPC5ABZxZLxlyEWYqmquQB5ABeEFiPAAosLRdqlfk9ajGBiOUaQAAmAAMAHYAKwar0ev0egDM9t1IGBAGE8WN3V7Q%2BGQDqsanFNYJQ6udpnfoJAr2ZHVfzPRG01GTrH8Qmk%2BXlSB9UxXQquR6AIzt0OBkMADi1KYdtil1ipIAAFnFRngWZguVyx54Ys4AA5oTAgaxAA) to test the api

#### Deployed Link

[click here](https://backdrop-graphql-api.onrender.com/graphql)
