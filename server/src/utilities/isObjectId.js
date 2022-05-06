
const isObjectId = (id)=>{
  if(!id || id && id.length < 24){
    return false
  } else {
    return true
  }
}

module.exports = isObjectId


