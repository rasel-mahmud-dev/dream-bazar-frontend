import express, { Router } from "express";
import AuthMiddleware from "../../middleware/auth.middleware";
import RoleController from "./role.controller";
const router: Router = express.Router();

class RoleRoute {
    initilize(router: Router) {
        router.get("/v1/roles", AuthMiddleware.requiredAuth, RoleController.getAllRoles)
        router.post("/v1/roles/users", AuthMiddleware.requiredAuth, RoleController.getAllUsers)
        router.get("/v1/roles/features-permission", AuthMiddleware.requiredAuth, RoleController.getAllUsers)
    }
}


// router.get("/route_access", async function (req, res, next) {
//     let client = await pool.connect()
//     try {
//         let {rows} = await client.query(`select *
//                                          from route_access`)
//         res.send(rows)
//
//     } catch (ex) {
//         next(ex)
//     } finally {
//         client?.release()
//     }
// })
//
// router.post("/new-role", async function (req, res, next) {
//     let client = await pool.connect()
//     try {
//         let {rows} = await client.query(`insert into roles (name)
//                                          values ($1)
//                                          returning *`, [req.body.roleName])
//         res.send(rows[0])
//     } catch (ex) {
//         next(ex)
//     } finally {
//         client?.release()
//     }
// })
//
//
// router.get("/route-access/:roleId", async function (req, res, next) {
//     let client = await pool.connect()
//     try {
//         const roleId = req.params.roleId
//
//         let {rows} = await client.query(`
//             select ra.id, ra.module_id
//             from route_access ra
//                      join public.role_route_access rra
//                           on ra.id = rra.access_id
//             where rra.role_id = $1
//         `, [roleId])
//
//         res.send(rows)
//
//     } catch (ex) {
//         next(ex)
//     } finally {
//         client?.release()
//     }
// })
//
// // get single role
// router.get("/user/:userId", async function (req, res, next) {
//     let client = await pool.connect()
//     try {
//         let {rows} = await client.query(`
//             select ur.user_role_id as user_role_id,
//                    r.name,
//                    r.id  as role_id
//             from users_roles ur
//                      join public.roles r on r.id = ur.role_id
//             where user_id = $1
//         `, [req.params.userId])
//
//         res.send({roles: rows })
//
//     } catch (ex) {
//         next(ex)
//     } finally {
//         client?.release()
//     }
// })
//
//
// router.put("/update/:roleId", async function (req, res, next) {
//     let client = await pool.connect()
//     const {routeAccess} = req.body
//     const roleId = req.params.roleId
//     try {
//         await client.query("BEGIN")
//
//         // get all access for current role expect payload id
//         let values = ""
//         for (let accessItem of routeAccess) {
//             const [moduleId, accessId] = accessItem.split("-")
//             let r = `('${moduleId}', '${accessId}'), `
//             values += r
//         }
//
//         values = values.replace(/,\s$/, "")
//
//         // delete other role_ access items
//         await client.query(`
//             DELETE
//             FROM role_route_access
//             WHERE id IN (SELECT rra.id
//                          FROM role_route_access rra
//                                   JOIN public.route_access ra
//                                        ON ra.id = rra.access_id
//                          WHERE (ra.module_id, ra.id) NOT IN (${values})
//                            AND rra.role_id = $1)
//
//         `, [roleId])
//
//
//         for (let accessItem of routeAccess) {
//             const [_moduleId, accessId] = accessItem.split("-")
//             await client.query(`
//                 INSERT INTO role_route_access(access_id, role_id)
//                 VALUES ($1, $2)
//                 ON CONFLICT (role_id, access_id) DO NOTHING
//             `, [accessId, roleId])
//         }
//
//         // await client.query('ROLLBACK')
//         await client.query('COMMIT')
//         res.send({message: "Permissions are updated"})
//
//     } catch (ex) {
//         await client.query('ROLLBACK')
//         next(ex)
//     } finally {
//         client?.release()
//     }
// })
//
//
// router.post("/user_roles", async function (req: Request, res: Response, next: NextFunction) {
//     let client = await pool.connect()
//     try {
//         const {
//             roles,
//             userId
//         } = req.body
//
//         await client.query("BEGIN")
//
//         // get all access for current role expect payload id
//         let values = ""
//         for (let roleId of roles) {
//             let r = `('${roleId}', '${userId}'), `
//             values += r
//         }
//
//         values = values.replace(/,\s$/, "")
//
//         let result = await client.query(`
//             SELECT ur.user_role_id
//             FROM users_roles ur
//             WHERE (ur.role_id, ur.user_id) NOT IN (${values})
//         `)
//         console.log(result.rows)
//
//         // now insert new ones
//         for (let roleId of roles) {
//             await client.query(`
//                 INSERT INTO users_roles(user_id, role_id)
//                 VALUES ($1, $2)
//                 ON CONFLICT (user_id, role_id) DO NOTHING
//             `, [userId, roleId])
//         }
//         await client.query("COMMIT")
//
//         res.status(200).json({message: "User role updated..."})
//
//     } catch (ex) {
//         await client.query('ROLLBACK')
//         next(ex)
//     } finally {
//         client?.release()
//     }
// })
//
//
// export default router

export default (new RoleRoute())