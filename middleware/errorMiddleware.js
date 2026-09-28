const errorMiddleware=(err,req,res,next)=>{
    console.error(err);
    if(err.code==="23505"){
        return res.status(409).json({
            message:"Email already exists"
        });
    }
    res.status(500).json({
        message:"Internal server error"
    });
};
module.exports=errorMiddleware;