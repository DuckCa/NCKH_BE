const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseOrac");

const CoinTransaction = sequelize.define(
    "CoinTransaction",
    {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        _UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        Amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        TransactionDate: {
            type: DataTypes.DATE.TIME,
            allowNull: false,
        }
    },
    {
        tableName: "CoinTransaction",
        paranoid: true,
        timestamps: true, // Bật timestamps
    }
)
    sequelize.sync().then(() => {
        console.log("User table created!");
});

module.exports = CoinTransaction;