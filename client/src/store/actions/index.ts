import * as productAction from "./productAction"
import * as authAction from "./authAction"
import * as appAction from "./appAction"
import * as cartAction from "./cartAction"

export default  { ...productAction, ...authAction, ...appAction, ...cartAction }
