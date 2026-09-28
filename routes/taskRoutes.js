const express=require("express");
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
}=require("../controllers/taskController");
const {validateTask}=require("../middleware/validationMiddleware");
const authMiddleware=require("../middleware/authMiddleware");
const roleMiddleware=require("../middleware/roleMiddleware");
const router=express.Router();
router.post("/",authMiddleware,validateTask,createTask);
router.get("/",authMiddleware,getTasks);
router.get(
    "/admin-test",
    authMiddleware,
    roleMiddleware("admin"),
    (req,res)=>{
        res.status(200).json({
            message:"welcome admin"
        });
    }
);
router.get("/:id",authMiddleware,getTaskById);
router.put("/:id",authMiddleware,validateTask,updateTask);
router.delete("/:id",authMiddleware,deleteTask);

module.exports=router;