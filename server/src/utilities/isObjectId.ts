const isObjectId = (id)=>{
  return !(!id || id && id.length < 24);
}

export default isObjectId


