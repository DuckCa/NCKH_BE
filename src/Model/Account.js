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

// Synchronize the model with the database
//{ force: true }
sequelize.sync({ force: true }).then(() => {
  console.log("User table created!");
});

module.exports = Account;

// const mongoose = require("mongoose");
// const mongoose_delete = require("mongoose-delete");

// const accountSchema = mongoose.Schema(
//   {
//     userName: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "cart" }],
//     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
//     coin: mongoose.Schema.Types.Decimal128,
//     level: Number,
//     bio: String,
//     portfolio: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "item",
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// accountSchema.plugin(mongoose_delete, { overrideMethods: "all" });
// const Account = mongoose.model("Account", accountSchema);

// module.exports = Account;
