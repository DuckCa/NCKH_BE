const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const { NUMBER } = require("sequelize");

const followSchema = mongoose.Schema(
  {
    userId: [{ type: NUMBER, require: true, unique: true }],
    follower: [{ type: NUMBER }],
    follow: [{ type: NUMBER }],
  },
  {
    timestamps: true,
  }
);
followSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
