

function permission(roles){
    return function (req, res, next){
        if(req.user?.roles){

        }
        console.log(req.user);
        next()
    }
}

export default permission