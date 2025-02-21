const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseMySQL");

const ArtistEntity = sequelize.define(
  "ArtistEntity",
  {
    ArtistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    CategoryId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ArtistEntity",
    paranoid: true,
    timestamps: true, // Bật timestamps
  }
);

// Synchronize the model with the database
//{ force: true }
sequelize.sync().then(() => {
  console.log("User table created!");
});

module.exports = ArtistEntity;
