import {Roles} from "../../models/User";

// to make the file a module and avoid the TypeScript error
export {}

declare global {
    namespace Express {
        export interface Request {
            rasel: {name: string},
            authUser: {
                _id: string,
                roles: Roles[]
                email: string
            }
        }
    }
}