const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const stepSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instructions: {
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

const Step = mongoose.model("Step", stepSchema);
module.exports = Step;
