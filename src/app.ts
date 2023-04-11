import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { resolvers } from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefintion";
import { connectDatabase } from "./database/conn";
import { errorHandler } from "./middleware/error-handler";

async function startServer() {
    try {
        // Create a new express app and apollo server instance
        const app = express();
        const apolloServer = new ApolloServer({ typeDefs, resolvers });

        // Connects to the database and starts the server if the connection is successful
        const connectionStatus = await connectDatabase();

        if (!connectionStatus) {
            throw new Error("Database connection failed");
        }

        await apolloServer.start();

        // Applies the graphql server to the express app
        apolloServer.applyMiddleware({ app });

        // Handles all routes that are not defined by the graphql server
        app.use((req, res) => {
            res.status(404).send("Not found");
        });

        // Handles all errors
        app.use(errorHandler);

        app.listen(4000, () => {
            console.log("Server started on http://localhost:4000/graphql");
        });
    } catch (error) {
        throw error;
    }
}

startServer();
