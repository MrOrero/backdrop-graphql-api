import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type User {
        id: ID!
        user_name: String!
        account_name: String
        bank_code: String
        account_number: String
        is_verified: Boolean
    }

    input BankDetails {
        id: ID!
        bankCode: String!
        accountNumber: String!
        accountName: String!
    }

    input GetAccountNameData {
        id: ID!
        bankCode: String!
        accountNumber: String!
    }

    type Query {
        getAccountName(getAccountNameData: GetAccountNameData): String!
    }

    type Mutation {
        createUser(userName: String!): User!
        addBankDetails(bankDetails: BankDetails): User!
    }
`;

export default typeDefs;
