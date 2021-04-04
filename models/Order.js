const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = mongoose.Schema({
  //   user: {
  //     type: ObjectId,
  //     required: true,
  //     ref: "User",
  //   },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        // required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      itemId: {
        type: ObjectId,
        required: true,
        ref: "Item",
      },
    },
  ],
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: "Indonesia",
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
