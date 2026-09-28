const pool=require("../config/db");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const registerUser=async (req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        const hashed_password=await bcrypt.hash(password,10);
        const result=await pool.query(
            `INSERT INTO users (name,email,password_hash)
            VALUES ($1,$2,$3) RETURNING id,name,email,role,created_at`,
            [name,email,hashed_password]
        );
        res.status(201).json({
            message:"user registered successfully",
            user:result.rows[0]
        });
    }catch(error){
        next(error);
    }
};

const loginUser = async (req,res,next)=>{
    try{
        const { email , password} =req.body;
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if(result.rows.length==0){
            return res.status(401).json({
                "message": "Invalid email or password"
            });
        }
        const user=result.rows[0];
        const isPasswordCorrect=await bcrypt.compare(
            password,user.password_hash
        );
        if(!isPasswordCorrect){
            return res.status(401).json({
                "message":"Invalid email or password"
            });
        }
        const token=jwt.sign(
            {
                "id":user.id,
                "role":user.role
            },
            process.env.JWT_SECRET,
            {
                "expiresIn":"1h"
            }
        );
        res.json({
            "message":"Login successful",
            "token":token,
            user: {
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });
    }catch(error){
        next(error);
    }
};
const getAllUsers=async (req,res,next)=>{
    try{
        const result=await pool.query(
            `SELECT id,name,email,role,created_at
            FROM users
            ORDER BY id`
        );
        res.status(200).json({
            users:result.rows
        });
    }catch(error){
       next(error);
    }
};
module.exports={
    
    registerUser,
    loginUser,
    getAllUsers
};