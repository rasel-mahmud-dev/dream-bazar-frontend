
const {getToken, parseToken} = require("../jwt")


module.exports = async (req, res, next)=>{
  const token = getToken(req)
  if(token){
   parseToken(token, (err, data)=>{
     if(!err){
       req.user_id = data._id
      next()
     } else{
        res.status(403).send("unorhorized")
     }
   })
  
  } else{
    res.status(403).send("unorhorized")
  }
}