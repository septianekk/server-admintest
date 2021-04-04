const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },

  itemId: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
});

// categorySchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// categorySchema.set("toJSON", {
//   virtuals: true,
// });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
