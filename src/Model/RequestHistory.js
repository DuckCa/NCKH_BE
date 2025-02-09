const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseMySQL");

const RequestHistory = sequelize.define(
  "RequestHistory",
  {
    _UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    _RequestId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Message: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Request_History",
    paranoid: true,
    timestamps: true, // Bật timestamps
  }
);
//{ force: true }
sequelize.sync().then(() => {
  console.log("User table created!");
});

module.exports = RequestHistory;
