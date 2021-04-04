const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/regis", userController.regisUser);
router.post("/login", userController.loginUser);

module.exports = router;
