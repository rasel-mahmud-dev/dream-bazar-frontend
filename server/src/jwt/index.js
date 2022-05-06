const jwt = require('jsonwebtoken')

exports.createToken = (_id, email)=> {
 let token = jwt.sign({
      _id: _id,
      email: email,
    }, 
    process.env.SECRET, { expiresIn: '5h' }
  );

  return token
}

exports.parseToken = (token, cb)=> {
   jwt.verify(token, process.env.SECRET, (err, d)=>{
     if(err){
       return cb(err, null)
     }
     cb(null, d)
   });
         
}

// exports.parseToken = (token)=> {
//   return new Promise(async (resolve, reject)=>{
//       try{
//         let decoded = await jwt.verify(token, process.env.SECRET);
//         // verify a token symmetric
//         return resolve({data: decoded, err: false})
//       } catch(ex){
//         reject({data: null, err: ex})
//       }
//   })
// }


exports.getToken = (req)=> {
  let token = req.headers["authorization"]
  return token
}

exports.isValid = ()=> {
  
}