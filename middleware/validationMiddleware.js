const validateTask=(req,res,next)=>{
    const {title,status}=req.body;
    if(!title || title.trim()==""){
        return res.status(400).json({
            message:"title is required"
        });
    }
    if(title.trim().length>200){
        return res.status(400).json({
            message:"title must not exceed 200 characters"
        });
    }
    if(status && status!="pending" && status!="completed"){
        return res.status(400).json({
            message:"status must be pending or completed"
        });
    }
    next();
};
const validateUserRegistration=(req,res,next)=>{
    const {name,email,password}=req.body;
    if(!name||name.trim()===""){
        return res.status(400).json({
            message:"name is required"
        });
    }
    if(!email || email.trim()===""){
        return res.status(400).json({
            message:"email is required"
        });
    }
    if(!email.includes("@")){
        return res.status(400).json({
            message:"invalid email"
        });
    }
    if(!password || password.length<6){
        return res.status(400).json({
            message:"password must be at least 6 characters"
        });
    }
    next();
};

const validateLogin=(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || email.trim()===""){
        return res.status(400).json({
            message:"email is required"
        });
    }
    if(!password || password.trim()===""){
        return res.status(400).json({
            message:"password is required"
        });
    }
    next();
};
module.exports={
    validateTask,
    validateUserRegistration,
    validateLogin
};