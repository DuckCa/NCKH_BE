const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseMySQL");

const Account = sequelize.define(
  "Account",
  {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cart: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    coin: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    bio: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Account",
    paranoid: true,
    timestamps: true, // Bật timestamps
  }
);

// sequelize
//   .query("SET FOREIGN_KEY_CHECKS = 0")
//   .then(() => {
//     return sequelize.sync({ force: true });
//   })
//   .then(() => {
//     return sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
//   })
//   .then(() => {
//     console.log("Database synced successfully!");
//   })
//   .catch((err) => {
//     console.error("Error syncing database:", err);
//   });

// Synchronize the model with the database
//{ force: true }
sequelize.sync().then(() => {
  console.log("User table created!");
});

module.exports = Account;
