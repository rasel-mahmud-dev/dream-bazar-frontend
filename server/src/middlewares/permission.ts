import {errorResponse} from "../response";


function permission(roles){
    
    return function (req, res, next){
        if(req.authUser?.roles &&  req.authUser?.roles.includes(...roles)){
            next()
        } else {
            errorResponse(next, "No Permission for this action", 401)
        }
    }
}

export default permission