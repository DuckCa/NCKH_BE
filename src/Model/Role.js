const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const roleSchema = mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
    },
    roleDescription: String,
  },
  {
    timestamps: true,
  }
);
roleSchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
