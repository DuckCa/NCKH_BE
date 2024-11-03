const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const matchRoleSchema = mongoose.Schema(
  {
    accountId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
    roleId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
  },
  {
    timestamps: true,
  }
);
matchRoleSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const MatchRole = mongoose.model("MatchRole", matchRoleSchema);

module.exports = MatchRole;
