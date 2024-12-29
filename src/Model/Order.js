const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseOrac");

const Order = sequelize.define(
    "Order",
    {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        _UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        day_Generate: {
            type: DataTypes.DATE.TIME,
            allowNull: false,
        }
    },
    {
        tableName: "Order",
        timestamps: true,
    }
)

sequelize.sync().then(() => {
    console.log("User table created!");
});
  
module.exports = Order;