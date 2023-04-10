import Sequelize from "sequelize";

import { sequelize } from "../database/conn";

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    account_name: {
        type: Sequelize.STRING,
        allowNull: false,
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
