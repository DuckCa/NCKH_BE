const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const categorySchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      unique: true,
    },
    Description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
categorySchema.plugin(mongoose_delete, { overrideMethods: "all" });
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
