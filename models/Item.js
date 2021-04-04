const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    required: true,
  },
  bahanId: [
    {
      type: ObjectId,
      ref: "Bahan",
    },
  ],
  stepId: [
    {
      type: ObjectId,
      ref: "Step",
    },
  ],
  imageId: [
    {
      type: ObjectId,
      ref: "Image",
    },
  ],
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
