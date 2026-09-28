const express = require("express");

const {
    
    registerUser,
    loginUser,
    getAllUsers
} = require("../controllers/userController");
const authMiddleware=require("../middleware/authMiddleware");
const roleMiddleware=require("../middleware/roleMiddleware");
const {
    validateUserRegistration,
    validateLogin
}=require("../middleware/validationMiddleware");
const router = express.Router();


router.post("/register",validateUserRegistration, registerUser);

router.post("/login",validateLogin,loginUser);

router.get("/profile",authMiddleware,(req,res)=> {
    res.json({
        message:"you are authenticated",
        user: req.user
    });
});
router.get(
    "/admin/all",
    authMiddleware,
    roleMiddleware("admin"),
    getAllUsers
);
module.exports = router;