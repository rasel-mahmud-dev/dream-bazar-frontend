import {getSqliteDb} from "./database.service";
import {errorResponse} from "../../response";


export function findOne(sql: string, params: any[]){
    return new Promise<[err: any, result: any]>(async (resolve, reject)=>{
        const db = await getSqliteDb();
        db.get(sql, params, (err, result)=>{
            if(err){
                resolve([err, null])
            } else {
                resolve([null, result])
            }
        })
    })
}


export function findAll(sql: string){
    return new Promise<[err: any, result: any]>(async (resolve, reject)=>{
        const db = await getSqliteDb();
        db.all(sql, function (err, data) {
            if (err) {
                resolve([err, null])
                return;
            }
            resolve([null, data])
        })
    })
}


export function update(sql: string,  params: any[]){
    return new Promise<[err: any, result: any]>(async (resolve, reject)=>{
        const db = await getSqliteDb();

        db.run(sql, params, function (err, data) {
            if (err) {
                resolve([err, null])
                return;
            }
            resolve([null, data])
        })
    })
}