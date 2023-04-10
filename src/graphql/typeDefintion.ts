import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Query {
        hello: String
    }

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

    type Mutation {
        createUser(userName: String!): User!
        addBankDetails(bankDetails: BankDetails): User!
    }
`;

export default typeDefs;
