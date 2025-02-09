const { DataTypes } = require("sequelize");
// Import the Sequelize Oracle connection instance
const sequelize = require("../config/databaseMySQL");

const MatchRole = sequelize.define(
  "MatchRole",
  {
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Account", // Tên bảng Account trong cơ sở dữ liệu
        key: "_id",
      },
      primaryKey: true,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Role", // Tên bảng Role trong cơ sở dữ liệu
        key: "_id",
      },
      primaryKey: true,
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
sequelize.sync().then(() => {
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
