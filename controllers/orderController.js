const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const midtransClient = require("midtrans-client");

module.exports = {
  addOrderItems: asyncHandler(async (req, res) => {
    // const user = await User.findById(req.user._id);
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-29QGN312r80149sGHUYD8c86",
      clientKey: "SB-Mid-client-noZ1PEPVSJV3Bmht",
    });
    const { userId, itemId, quantity, total } = req.body;

    const order = await Order.create({
      userId,
      itemId,
      quantity,
      total,
      payment_url,
      userId: req.user._id,
    });

    let parameter = {
      transaction_details: {
        order_id: order.id,
        groos_amount: order.total,
      },
      customer_details: {
        name: order.name,
        email: order.email,
      },
      enaled_payments: [gopay, bank_transfer],
      vtweb: [],
    };

    snap
      .createTransaction(parameter)
      .then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        console.log("transactionToken:", transactionToken);

        // transaction redirect url
        let transactionRedirectUrl = transaction.paymentUrl;
        order.payment_url = `${transactionRedirectUrl}/${transactionToken}`;
        const orderTest = order.save();
        console.log("transactionRedirectUrl:", transactionRedirectUrl);
        res.status(200).json({
          success: true,
          orderTest,
          order,
        });
      })
      .catch((e) => {
        console.log("Error occured:", e.message);
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
