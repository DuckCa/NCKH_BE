const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const accountSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "cart" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
    coin: mongoose.Schema.Types.Decimal128,
    level: Number,
    bio: String,
    portfolio: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
  },
  {
    timestamps: true,
  }
);
accountSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
