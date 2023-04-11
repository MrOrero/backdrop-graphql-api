import { Sequelize } from "sequelize";

// creates a sequelize connection using the env variable
export const sequelize = new Sequelize(process.env.POSTGRESQL_URI!, {
    dialect: "postgres",
});

// connects to the database and returns a boolean value indicating the status of the connection
export async function connectDatabase(): Promise<boolean> {
    try {
        await sequelize.sync();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
