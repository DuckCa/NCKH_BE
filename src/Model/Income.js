const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseMySQL");

const Income = sequelize.define(
  "Income",
  {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalIncome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Income",
    paranoid: true,
    timestamps: true, // Bật timestamps
  }
);

// Synchronize the model with the database
//{ force: true }
sequelize.sync().then(() => {
  console.log("User table created!");
});

module.exports = Income;
