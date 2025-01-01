const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const { NUMBER } = require("sequelize");

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
    artist: [{ type: Number }],
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
    price: {
      type: mongoose.Schema.Types.Decimal128,
      default: 100000,
    },

    like: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
    },
    vote: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
    },
    state: {
      type: String,
      default: "Available",
    },
    url: {
      type: String,
      required: true,
    },
    originlUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
itemSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
