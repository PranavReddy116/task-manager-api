const pool=require("../config/db");
const createTask=async (req,res,next)=>{
    try{
        const {title,description,status}=req.body;
        const userId=req.user.id;
        
        const result=await pool.query(
            `INSERT INTO tasks (title,description,status,user_id)
            VALUES ($1,$2,$3,$4)
            RETURNING *`,
            [title,description,status||"pending",userId]
        );
        res.status(201).json({
            message:"task created successfully",
            task:result.rows[0]
        });

    }catch(error){
        next(error);
    }
};
const getTasks=async (req,res,next)=>{
    try{
        const userId=req.user.id;
        const result=await pool.query(
            "SELECT * FROM tasks WHERE user_id=$1",
            [userId]
        );
        res.status(200).json({
            tasks:result.rows
        });
    }catch(error){
        next(error);
    }
};
const getTaskById=async (req,res,next)=>{
    try{
        const taskId=req.params.id;
        const userId=req.user.id;
        const result=await pool.query(
            `SELECT * FROM tasks
            WHERE id=$1 AND user_id=$2`,
            [taskId,userId]
        );
        if(result.rows.length==0){
            return res.status(404).json({
                message:"task not found"
            });
        }
        res.status(200).json({
            task:result.rows[0]
        });
    }catch(error){
        next(error);
    }
};
const updateTask=async(req,res,next)=>{
    try{
        const taskId=req.params.id;
        const userId=req.user.id;
        const {title,description,status}=req.body;
        const result=await pool.query(
            `UPDATE tasks
            SET title=$1,
                description=$2,
                status=$3
            WHERE id=$4 AND user_id=$5
            RETURNING *`,
            [title,description,status,taskId,userId]
        );
        if(result.rows.length==0){
            return res.status(404).json({
                message:"task not found"
            });
        }
        res.status(200).json({
            message:"task updated successfully",
            task:result.rows[0]
        });
    }catch(error){
        next(error);
    }
};
const deleteTask=async(req,res,next)=>{
    try{
        const taskId=req.params.id;
        const userId=req.user.id;
        const result=await pool.query(
            `DELETE FROM tasks 
            WHERE id=$1 AND user_id=$2
            RETURNING *`,
            [taskId,userId]
        );
        if(result.rows.length==0){
            return res.status(404).json({
                message:"task not found"
            });
        }
        res.status(200).json({
            message:"task deleted successfully",
            task:result.rows[0]
        });
    }catch(error){
        next(error);
    }
};
module.exports={
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};