const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

module.exports = {
  addOrderItems: asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingInfo,
      paymentMethod,
      itemsPrice,
      totalPrice,
    } = req.body;
    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      totalPrice,
      paymentMethod,
      paidAt: Date.now(),
      //   user: req.user._id,
    });
    res.status(200).json({
      success: true,
      order,
    });
  }),

  // get order /api/v1/order/:id
  getOrderById: asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }),

  // get logged in user order
  myOrders: asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  }),

  updateOrderToPaid: asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }),
};
