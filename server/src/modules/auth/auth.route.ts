import {Router} from "express";
import AuthController from "./auth.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router()

router.post("/login", AuthController.login)
router.post("/registration", AuthController.registration)
router.get("/verify", authMiddleware.requiredAuth, AuthController.verifyAuth)
// router.post("/admin/login", adminLogin)
// router.post("/registration", authController.registration)
// router.get("/auth/admin/current-auth", adminAuthLoading)
// router.get("/auth/profile", authMiddleware.requiredAuth, authController.getProfile)
// router.post("/auth/profile", authMiddleware.requiredAuth, authController.updateProfile)

// router.get("/auth/fetch-profile/:user_id", isAuth, authController.fetchProfile)

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this routerlication at /auth/google/callback

//
// // route call via react js
// router.get('/auth/google',
//     passport.authenticate('google', {scope: ['profile', 'email']}));
//
//
// // GET /auth/google/callback
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   login page.  Otherwise, the primary route function will be called,
// //   which, in this example, will redirect the user to the home page.
//
// // call by react js when google callback
// router.get('/auth/callback/google', passport.authenticate('google'),  (req: Request, res: Response)=>{
//
//     if(req?.user){
//         const token = JwtService.createToken({
//             id: req.user._id,
//             email: req.user.email,
//             roles: req.user.roles
//         })
//         res.redirect((process.env.FRONT_END as string) + `?token=${token}`)
//     } else {
//         res.redirect((process.env.FRONT_END as string))
//     }
// })
//
//
// router.get('/auth/facebook',  passport.authenticate('facebook'));
//
// router.get('/auth/callback/facebook', passport.authenticate('facebook'), function (req, res) {
//         // Successful authentication, redirect home.
//         // res.redirect('/');
//         console.log("okkk")
//     });
//

export default router;

