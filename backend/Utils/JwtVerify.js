const jwt = require("jsonwebtoken");

const jwtAuthenticate = (req,res,next)=>{
    const bearerHeader = req.header('authorization');

    if(!bearerHeader){
        return res.status(401).json({err:"Unauthorized"});
    }

    const token = bearerHeader.split(" ")[1];

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).json({err:"Forbidden"})
        }
        
        req.user = decoded.id;
        next();
    });
};

module.exports=jwtAuthenticate;