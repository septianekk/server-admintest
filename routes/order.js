const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post("/order/new", orderController.addOrderItems);
router.get("/order/get/:id", orderController.getOrderById);

module.exports = router;
