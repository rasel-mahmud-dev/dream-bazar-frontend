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


export function insertOne(sql: string,  params: any[]){
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

export function deleteOneById(tableName: string, id: string){
    return new Promise<[err: any, result: any]>(async (resolve, reject)=>{
        const db = await getSqliteDb();
        let sql = 'DELETE FROM ' + tableName + " WHERE id = ? ";
        db.run(sql, [id], function (err, data) {
            if (err) {
                resolve([err, null])
                return;
            }
            resolve([null, data])
        })
    })
}

export function deleteOne(tableName: string, filter: object){
    return new Promise<[err: any, result: any]>(async (resolve, reject)=>{
        const db = await getSqliteDb();
        let sql = 'DELETE FORM ' + tableName + "WHERE ";

        let filterStr = "";
        let i = 0
        for (const filterKey in filter) {
            if(i > 1) {
                filterStr += ` && ${filterKey} = ? `
            } else {
                filterStr += `${filterKey} = ? `
            }
            i++
        }

        console.log(filterStr)

        // db.run(sql, params, function (err, data) {
        //     if (err) {
        //         resolve([err, null])
        //         return;
        //     }
        //     resolve([null, data])
        // })
    })
}