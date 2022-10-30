import {errorResponse} from "../response";


function permission(roles){
    return function (req, res, next){
        if(req.authUser?.roles && req.authUser?.roles.length){
            for(let r of req.authUser?.roles){
                if(roles.includes(r)){
                    return next()
                }
            }
            errorResponse(next, "No Permission for this action", 401)
        } else {
            errorResponse(next, "No Permission for this action", 401)
        }
    }
}

export default permission