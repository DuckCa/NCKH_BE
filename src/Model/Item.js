const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    artist: [{ type: mongoose.Schema.Types.ObjectId, ref: "account" }],
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
    price: {
      type: Decimal,
      default: 100000,
    },
    like: {
      type: Decimal,
      default: 0,
    },
    vote: {
      type: Decimal,
      default: 0,
    },
    state: {
      type: String,
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);
itemSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
