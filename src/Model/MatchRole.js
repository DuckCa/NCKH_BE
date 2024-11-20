const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseOrac");

const MatchRole = sequelize.define(
  "MatchRole",
  {
    accountId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      allowNull: false,
    },
  },
  {
    tableName: "MatchRole",
    paranoid: true,
    timestamps: true, // Bật timestamps
  }
);

// Synchronize the model with the database
sequelize.sync({ force: true }).then(() => {
  console.log("User table created!");
});

module.exports = MatchRole;

// const mongoose = require("mongoose");
// const mongoose_delete = require("mongoose-delete");

// const matchRoleSchema = mongoose.Schema(
//   {
//     accountId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
//     roleId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
//   },
//   {
//     timestamps: true,
//   }
// );
// matchRoleSchema.plugin(mongoose_delete, { overrideMethods: "all" });
// const MatchRole = mongoose.model("MatchRole", matchRoleSchema);

// module.exports = MatchRole;
