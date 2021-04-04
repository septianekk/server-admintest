const router = require("express").Router();

const itemController = require("../controllers/itemController");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");

router.get("/items", itemController.getAllItem);
router.get("/item/:id", itemController.getItemById);

module.exports = router;
