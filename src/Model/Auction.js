const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseOrac");

const Auction = sequelize.define(
    "Auction",
    {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique:true,
        },
        startingPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        currentBidderId: {
            type:  DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
        },
        startTime: {
            type: DataTypes.DATE.TIME,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE.TIME,
            allowNull: false
        },
        currentBid: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        }
    },
    {
        tableName: "Auction",
        paranoid: true,
    },
    
)
sequelize.sync().then(() => {
console.log("User table created!");
});

module.exports = Auction;