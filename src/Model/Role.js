const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseMySQL");

const Role = sequelize.define(
  "Role",
  {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    roleDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Role",
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
sequelize.sync().then(() => {
  console.log("User table created!");
});

module.exports = Role;

// const mongoose = require("mongoose");
// const mongoose_delete = require("mongoose-delete");

// const roleSchema = mongoose.Schema(
//   {
//     roleName: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     roleDescription: String,
//   },
//   {
//     timestamps: true,
//   }
// );
// roleSchema.plugin(mongoose_delete, { overrideMethods: "all" });
// const Role = mongoose.model("Role", roleSchema);

// module.exports = Role;
