const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const bidHistorySchema = mongoose.Schema(
  {
    _UserId: {
      type: Number,
      required: true,
      unique: true,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    timestamps: {
        type: DATE.TIME,
    }
  },
  {
    timestamps: true,
  }
);

bidHistorySchema.plugin(mongoose_delete, { overrideMethods: "all" });
const bidHistory= mongoose.model("bidHistory", bidHistorySchema);

module.exports = bidHistory;