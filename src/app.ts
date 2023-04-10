import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello world!",
    },
};

async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({ typeDefs, resolvers });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.use((req, res) => {
        res.status(404).send("Not found");
    });

    app.listen(4000, () => {
        console.log("Server started on http://localhost:4000/graphql");
    });
}

startServer();
