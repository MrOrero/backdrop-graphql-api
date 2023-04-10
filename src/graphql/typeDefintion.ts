import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Query {
        hello: String
    }

    type User {
        id: ID!
        account_name: String
        bank_code: String
        account_number: String
        is_verified: Boolean
    }

    type Mutation {
        createUser(accountName: String!): User!
    }
`;

export default typeDefs;
