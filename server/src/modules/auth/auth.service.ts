import JwtService from "../../services/jwt";
import {Roles, StatusCode} from "../../types";
import User from "../../models/User";
import {createHash} from "../../hash";
import throwError from "../../utilities/throwError";
import {mongoConnect} from "../../services/mongodb/database.service";
import * as mongoDB from "mongodb";
import {errorResponse, successResponse} from "../../response";
import {ObjectId} from "mongodb";


class AuthService {
    async login(body: { email: string, password: string }) {

        const {email, password} = body;

        try {
            if (!(email && password)) {
                throwError('Please provide valid credential', StatusCode.Forbidden)
            }
            let user = await User.findOne<User>({email})
            if (!user) {
                throwError('You are not registered', 404)
            }

            if (!user.password) {
                throwError('You haven"t any password', 409)
            }
            // const isMatched = await hashCompare(password, user.password as string)
            // if (!isMatched) {
            //     throwError('Password Error', 404)
            // }

            let token = JwtService.createToken({
                id: String(user._id),
                roles: user.roles as string[],
            })

            delete user.password;

            return {
                user,
                token
            }

        } catch (ex: any) {
            throwError(ex.message)
        }

        // const user = await AuthRepository.getLoggedUserInfo(body.email);
        //
        // if (!user) return throwError("You are not registered", 401)
        // const isMatchPassword = await BcryptService.hashCompare(body.password, user.password)
        //
        // if (!isMatchPassword) {
        //     let hasUsed = await AuthRepository.isUsedPassword(user.user_id, body.password);
        //     if (hasUsed)
        //         throw new Error(
        //             "You recently updated your password. Please use your updated password."
        //         );
        //     throw new Error(
        //         "Invalid credential: Either the user_id or password is incorrect."
        //     );
        // }
        //
        //
        // let dbToken = user.access_token;
        // if (!Jwt.parseToken(dbToken as string)) {
        //     dbToken = JwtService.createToken({
        //         id: user.id,
        //         email: user.email
        //     })
        // }
        //
        // let userAgent = req.get('user-agent') as string
        // const ipAddress = getClientIpAddress(req)
        // const sessionId = generateSessionId();
        //
        // await AuthRepository.updateAuthCredential({
        //     userId: user.id,
        //     sessionId,
        //     userAgent,
        //     ipAddress,
        //     accessToken: dbToken,
        // });
        //
        // await AuthRepository.createSignInHistory(user.user_id, userAgent, ipAddress);
        // return {
        //     sessionId: sessionId,
        //     username: user?.user_name,
        //     isFirstSignIn: user.is_first_signin,
        //     email: user.user_email,
        //     userId: user.user_id,
        //     token: dbToken as string
        // };
    }

    async registration(body: { email: string, password: string, firstName: string, lastName: string }) {
        try {
            const {email, firstName, lastName, password} = body

            if (!(email && firstName && password)) {
                return throwError("Please provide valid credential", StatusCode.UnprocessableEntity)
            }

            const database = await mongoConnect();

            const user = await database.collection("users").findOne<User>({email})
            if (user) {
                return throwError("User already registered", StatusCode.Conflict)
            }

            let newUser = new User({
                firstName,
                email,
                lastName: (lastName ? " " + lastName : ""),
                username: firstName + (lastName ? " " + lastName : ""),
                roles: [Roles.CUSTOMER]
            })

            const [err, hashPassword] = await createHash(password)
            if (!err) {
                newUser.password = hashPassword;
            }

            const doc: mongoDB.InsertOneResult = await database.collection("users").insertOne(newUser)

            if (doc.insertedId) {

                let token = JwtService.createToken({
                    id: String(doc.insertedId),
                    roles: []
                })
                delete newUser.password;
                newUser._id = doc.insertedId

                return {
                    user: newUser,
                    token
                }

            } else {
                return throwError("Registration fail. please try again.")
            }

        } catch (ex: any) {
            return throwError(ex.message)
        }
    }

    async verifyAuth(authUser: any) {
        try {
            if (!authUser) {
                return throwError("Please login.", StatusCode.Unauthorized)
            }

            const database = await mongoConnect();

            // validate user roles
            const user = await database.collection("users").findOne<User>({
                _id: new ObjectId(authUser.id)
            })

            if (!user) {
                return throwError("Please login.", StatusCode.Unauthorized)
            }

            delete user.password
            return user

        } catch (ex) {
            throw ex
        }
    }

    // // todo: remove any
    // async authVerifyService(req: any) {
    //     const {jwt, session} = req.cookies;
    //     const userAgent = req.headers["user-agent"] || "";
    //     const ipAddress = req.headers["x-forwarded-for"] || req.ip;
    //     if (!session) throw Error("Your session has expired, Please login again");
    //     const tokenData = await Jwt.parseToken(jwt);
    //     if (!tokenData.userId)
    //         throw Error("Your session has expired, Please login again");
    //     let dbUserInfo = await AuthRepository.getLoggedUserInfo(tokenData.user_id);
    //     if (!dbUserInfo) throw Error("Login first");
    //
    //     if (
    //         dbUserInfo.access_token != jwt &&
    //         dbUserInfo.session_id != session &&
    //         dbUserInfo.user_ip != ipAddress &&
    //         dbUserInfo.user_agent != userAgent
    //     )
    //         throw Error("UnAuthorize, Please login");
    //
    //     return {
    //         username: dbUserInfo.user_name,
    //         isFirstSignIn: dbUserInfo.is_first_signin,
    //         email: dbUserInfo.email,
    //         userId: tokenData.userId
    //     };
    // }
    //
    // async sendPasswordResetMail(body: {
    //     value: string;
    //     field: "userId" | "email";
    // }) {
    //     let user;
    //     if (body.field === "userId") {
    //         let result = await AuthRepository.getUserByUserId(body.value);
    //         if (!result.rows[0]) throw Error("User Id not found in the database");
    //         user = result.rows[0];
    //     } else {
    //         let result = await AuthRepository.getUserByEmail(body.value);
    //         if (!result.rows[0]) throw Error("This Email is not registered yet.");
    //         user = result.rows[0];
    //     }
    //
    //     let dbToken = Jwt.generateToken(
    //         {
    //             userId: user.user_id,
    //             email: user.email
    //         },
    //         "5m"
    //     );
    //
    //     return await Mail.sendEmail({
    //         to: user.email,
    //         subject: "Password reset mail",
    //         html: `getEmailTemplate({
    //             userEmail: user.user_email,
    //             url: process.env.FRONTEND_URL,
    //             dbToken: dbToken,
    //         })`,
    //     });
    // }
    //
    // async verifyResetPasswordToken(token?: string) {
    //     try {
    //         if (!Jwt.parseToken(token as string)) return throwError("Password reset token expired. Please try another time.");
    //         return true;
    //     } catch (err) {
    //         console.log(err);
    //         throw err;
    //     }
    // }
    //
    // async resetPassword(payload: { token: string; newPassword: string }) {
    //     if (!payload.token) throw Error("Password reset fail. Please try again.");
    //     let tokenData = Jwt.parseToken(payload.token);
    //     if (!tokenData)
    //         throw Error("Password reset token expired. Please try another time.");
    //
    //     const {userId} = tokenData;
    //
    //     let hash = await Bcrypt.generatePassword(payload.newPassword);
    //
    //     let hasUsed = await AuthRepository.isUsedPassword(
    //         userId,
    //         payload.newPassword
    //     );
    //     if (hasUsed)
    //         throw new Error(
    //             "You cannot use this password because it has been recently used. Please choose a different password."
    //         );
    //
    //     let oldPassword;
    //     let userPass = await pool.query(
    //         "select password from signin where user_id = $1",
    //         [userId]
    //     );
    //     if (userPass?.rows[0]) {
    //         oldPassword = userPass.rows[0].password;
    //     }
    //
    //     await AuthRepository.updatePasswordRepo(userId, hash);
    //
    //     await AuthRepository.updateAuthCredential({
    //         userId: userId,
    //         ipAddress: "",
    //         sessionId: "",
    //         accessToken: "",
    //         userAgent: "",
    //     });
    //
    //     oldPassword &&
    //     (await AuthRepository.storeOldPassword(oldPassword, userId));
    //     return {};
    // }
    //
    // async setUpPassword(payload: { newPassword: string }, user: any) {
    //     const result = await AuthRepository.setUpNewPasswordRepo({
    //         userId: user.userId,
    //         password: payload.newPassword,
    //     });
    //     await AuthRepository.clearAllRecentPassword(user.userId);
    //     return result;
    // }
    //
    // async logOut(user: { userId: string }) {
    //     const authInfo = await AuthRepository.getLoggedUserInfo(user.userId);
    //     await AuthRepository.createSignInHistory(
    //         user.userId,
    //         authInfo?.user_agent,
    //         authInfo?.user_ip,
    //         "SignOut"
    //     );
    //     await AuthRepository.updateAuthCredential({
    //         userId: user.userId,
    //         sessionId: "",
    //     });
    //     await AuthRepository.changeSignInLogStatus(user.userId);
    //     return {};
    // }
    //
    // loginMultipleDevices() {
    //
    //     // let a = await client.query(`select *
    //     //                             from sign_devices
    //     //                             where user_id = $1
    //     //                               AND user_agent = $2
    //     //                               AND ip_address = $3`, [user.user_id, userAgent, newDevice.ip_address])
    //     // if (a && a.rows && a.rows.length > 0) {
    //     //     let updateDevice = await client.query(
    //     //         `UPDATE sign_devices
    //     //          SET token      = $1,
    //     //              sign_in    = $2,
    //     //              user_agent = $3,
    //     //              ip_address = $4
    //     //          WHERE id = $5`,
    //     //         [newDevice.token, true, userAgent, newDevice.ip_address, a.rows[0].id]
    //     //     );
    //     //     console.log(updateDevice.rowCount, "update device")
    //     // } else {
    //     //     let insertResult = await client.query(`insert into sign_devices(user_agent, ip_address, token, sign_in, user_id, is_mobile)
    //     //                                            values ($1, $2, $3, $4, $5, $6)`,
    //     //         [newDevice.userAgent, newDevice.ip_address, newDevice.token, true, user.user_id, newDevice.isMobile]
    //     //     )
    //     //     console.log(insertResult.rowCount, "add new  device")
    //     // }
    //     //
    //
    //     // delete user["password"]
    //     //
    //     // res.status(200).json({
    //     //     token,
    //     //     user
    //     // })
    //
    // }

}

export default (new AuthService())