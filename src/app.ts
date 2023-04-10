import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { resolvers } from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefintion";
import { connectDatabase } from "./database/conn";

async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({ typeDefs, resolvers });

    const connectionStatus = await connectDatabase();

    if (!connectionStatus) {
        console.log("Database connection failed");
        return;
    }

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
