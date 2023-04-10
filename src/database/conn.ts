import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.POSTGRESQL_URI!, {
    dialect: "postgres",
});

export async function connectDatabase(): Promise<boolean> {
    try {
        await sequelize.sync();
        return true;
    } catch (error) {
        return false;
    }
}

// export default conn;
