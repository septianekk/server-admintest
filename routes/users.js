const router = require("express").Router();
const userController = require("../controllers/userController");
const protect = require("../middlewares/auth");

router.post("/regis", userController.regisUser);
router.post("/login", userController.loginUser);
router.get("/logout", protect, userController.logout);
router.put("/user/profile/update", protect, userController.updateProfile);
router.get("/user/profile", protect, userController.getUserProfile);

module.exports = router;
