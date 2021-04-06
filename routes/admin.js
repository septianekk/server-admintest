const router = require("express").Router();

const adminController = require("../controllers/adminController");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");

router.get("/dashboard", adminController.viewDashboard);
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);

router.get("/item", adminController.viewItem);
router.post("/item", uploadMultiple, adminController.addItem);
router.get("/item/show-image/:id", adminController.showImageItem);
router.get("/item/:id", adminController.showEditItem);
router.put("/item/:id", uploadMultiple, adminController.editItem);
router.delete("/item/:id/delete", adminController.deleteItem);

// detail item
router.get("/item/show-detail-item/:itemId", adminController.viewDetailItem);
router.post("/item/add/bahan", uploadSingle, adminController.addBahan);
router.put("/item/update/bahan", uploadSingle, adminController.editBahan);
router.delete("/item/:itemId/bahan/:id", adminController.deleteBahan);
// Step
router.post("/item/add/step", uploadSingle, adminController.addStep);
router.put("/item/update/step", uploadSingle, adminController.editStep);
router.delete(
  "/item/:itemId/step/:id",
  uploadSingle,
  adminController.deleteStep
);

// Order
router.get("/order", adminController.viewOrder);

// get users
router.get("/users", adminController.getUsers);
router.get("/user/:id", adminController.getUserById);

module.exports = router;
