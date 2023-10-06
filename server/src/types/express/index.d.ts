import {Roles} from "../../models/User";
import {ObjectId} from "mongodb";

// to make the file a module and avoid the TypeScript error


declare global {
    namespace Express {
        interface Request {
            authUser: {
                id: ObjectId | string
                roles: Roles[]
            }
        }
    }
}
