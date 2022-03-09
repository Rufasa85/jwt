const jwt = require("jsonwebtoken");
module.exports = function (req,res,next){
    const token = req.headers?.authorization?.split(" ").pop();
    if(!token){
        return res.status(403).json({msg:"invalid token!"})
    }
    jwt.verify(token,"turtledog",(err,data)=>{
        if(err){
            return res.status(403).json({msg:"invalid token!"})
        }
        req.user=data.userId
        next()
    })
}