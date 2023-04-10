import Sequelize, { Model } from "sequelize";

import { sequelize } from "../database/conn";

interface UserAttributes {
    id?: string;
    user_name: string;
    account_name?: string;
    bank_code?: string;
    account_number?: string;
    is_verified?: boolean;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

const User = sequelize.define<UserInstance>("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    account_name: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    bank_code: {
        type: Sequelize.STRING,
        defaultValue: null,
    },
    account_number: {
        type: Sequelize.STRING,
        defaultValue: null,
        unique: true,
    },
    is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

export default User;
