const router=require("express").Router();
const userController = require("../controllers/user-controller")

router.post("/login", userController.login);
router.post("/signup" , userController.register);
router.post("/user" , userController.get_Single_Users);
router.patch("/updateuser/:userId" , userController.update_Single_Users);


module.exports=router