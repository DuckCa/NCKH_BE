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
    role: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
accountSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
