const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/regis", userController.regisUser);
router.post("/login", userController.loginUser);
router.put("/user/profile/update/:id", userController.updateProfile);
router.get("/user/profile/:id", userController.getUserProfile);

module.exports = router;
