import {Roles} from "../../models/User";
import {ObjectId} from "mongodb";

// to make the file a module and avoid the TypeScript error


declare global {
    namespace Express {
        // tslint:disable-next-line:no-empty-interface
        interface AuthInfo {}
        // tslint:disable-next-line:no-empty-interface
        interface User {
            _id: ObjectId | string
            roles: Roles[]
            email: string
        }

        interface Request {

            authUser: {
                _id: ObjectId | string
                roles: Roles[]
                email: string
            }
        }
    }
}
