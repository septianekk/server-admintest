const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bahanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  itemId: {
    type: ObjectId,
    ref: "Item",
  },
});

const Bahan = mongoose.model("Bahan", bahanSchema);
module.exports = Bahan;
