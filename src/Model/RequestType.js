const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseOrac");

const RequestType = sequelize.define(
  "RequestType",
  {
    _RequestId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },

    Name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    Description: {
      type: DataTypes.STRING, 
    }
  },
  {
    tableName: "RequestType",
    paranoid: true,
    timestamps: true, // Bật timestamps
  }
);

sequelize.sync().then(() => {
  console.log("User table created!");
});

module.exports = RequestType;
