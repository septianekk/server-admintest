const router = require("express").Router();
const orderController = require("../controllers/orderController");
const protect = require("../middlewares/auth");

router.post("/order/new", protect, orderController.addOrderItems);
router.get("/order/get/:id", protect, orderController.getOrderById);
router.put("/order/:id/pay", protect, orderController.updateOrderToPaid);

module.exports = router;
