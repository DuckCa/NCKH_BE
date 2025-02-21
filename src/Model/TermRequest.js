const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseMySQL");

const TermRequest = sequelize.define(
  "TermRequest",
  {
    TermId: {
      type: DataTypes.String,
      primaryKey: true,
      allowNull: false,
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Term Request",
    paranoid: true,
    timestamps: true, // Bật timestamps
  }
);
//{ force: true }
sequelize.sync().then(() => {
  console.log("User table created!");
});

module.exports = TermRequest;
