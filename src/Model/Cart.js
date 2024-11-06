const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const cartSchema = mongoose.Schema(
  {
    item: [{ type: mongoose.Schema.Types.ObjectId, ref: "item" }],
  },
  {
    timestamps: true,
  }
);
cartSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
