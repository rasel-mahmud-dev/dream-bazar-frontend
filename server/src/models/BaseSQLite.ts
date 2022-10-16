import {getSqliteDb} from "../services/sqlite/database.service";
import  {BrandType} from "./Brand";
import {productFiltersGetV2} from "../controllers/productController";


class BaseSQLite {
    
    static tableName: string;
    
    constructor(tableName: string){
        // for instance method update tableName static property
        BaseSQLite.tableName = tableName
    }
    
    
    static findOne<T>(sql: string, params: any[]){
        return new Promise<[err: string | null, result: T]>(async (resolve, reject)=>{
            const db = await getSqliteDb();
            db.get(sql, params, (err: any, result: T)=>{
                if(err){
                    resolve([err, result])
                } else {
                    resolve([null, result])
                }
            })
        })
    }
    
    static findAll<T>(sql: string){
        return new Promise<[err: any, result: T]>(async (resolve, reject)=>{
            const db = await getSqliteDb();
            db.all(sql, function (err: any, data: T) {
                if (err) {
                    resolve([err, data])
                    return;
                }
                resolve([null, data])
            })
        })
    }
    
    
    static update<T>(sql: string,  params: any[]){
        return new Promise<[err: string | null, result: any]>(async (resolve, reject)=>{
            const db = await getSqliteDb();
            
            db.run(sql, params, function (err: any, data: T) {
                if (err) {
                    resolve([err, null])
                    return;
                }
                resolve([null, data])
            })
        })
    }
    
    
    insertOne<T>(){
        return new Promise<[err: any, result: T | null]>(async (resolve, reject)=>{
            let fieldName = "";
            let values = []
            let valuesPlaceholder = "";
        
            const data: T | any = { ...this };
            for (const dataKey in data) {
                // ignore tableName field
                if (dataKey !== "tableName") {
                    fieldName = fieldName + ", " + dataKey;
                    values.push(data[dataKey])
                    valuesPlaceholder += "?, "
                }
            }
        
            try {
                let tableName = BaseSQLite.tableName;
                
                let sql = `insert into ${tableName}( ${fieldName.slice(2)} ) Values(${valuesPlaceholder.slice(0, valuesPlaceholder.length - 2)})`;
                
                const db = await getSqliteDb();
                db.run(sql, values, function (err: any, result: any) {
                    if (err) {
                        resolve([err, null])
                        return;
                    }
                    resolve([null, data])
                })
                
            } catch (ex) {
                throw ex;
            }
        })
    }
    
    updateOne<T>(id: string | number){
        return new Promise<[err: any, result: T | null]>(async (resolve, reject)=>{
            
            let fieldName = "";
            
            let values = []
        
            let data: any = this
            
            
            for (const dataKey in data) {
                // ignore tableName field
                
                if (dataKey !== "tableName"  &&  dataKey !== "id" && dataKey !== "createdAt") {
                    fieldName += `'${dataKey}' = ?, `;
                    values.push(data[dataKey])
                }
            }
            
            try {
                let tableName = BaseSQLite.tableName;
                
                // UPDATE categories SET 'parentId' = ?, 'name' = ?, 'isProductLevel' = ?, 'ideals' = ?, 'updatedAt' = ? WHERE id = ?
                let sql = `UPDATE ${tableName} SET ${fieldName.slice(0, fieldName.lastIndexOf(","))} WHERE id = ?`;
      
                const db = await getSqliteDb();
                
                db.run(sql, [...values, id], function (err: any, _: any) {
                    if (err) {
                        resolve([err, null])
                        return;
                    }
                    data["id"] = id
                    resolve([null, data])
                })
                
            } catch (ex) {
                throw ex;
            }
        })
    }
    
    
    static deleteOneById(id: string){
        return new Promise<[err: any, result: string]>(async (resolve, reject)=>{
            const db = await getSqliteDb();
            let sql = 'DELETE FROM ' + this.tableName + " WHERE id = ? ";
            db.run(sql, [id], function (err: any, _) {
                if (err) {
                    resolve([err, ""])
                    return;
                }
                resolve([null, id])
            })
        })
    }
    
    static deleteOne<T>(filter: BrandType){
        return new Promise<[err: any, result: any]>(async (resolve, reject)=>{
            
            const db = await getSqliteDb();
            
            let sql = 'DELETE FROM ' + this.tableName + ' WHERE ';
            
            let filterStr = "";
            let filterKey: keyof BrandType
            for (filterKey in filter) {
                filterStr += `${filterKey} = "${filter[filterKey]}" AND `
            }
            
            sql += filterStr.slice(0, filterStr.length - 4);
            
            db.run(sql, function (err: any, data: T) {
              
                if (err) {
                    resolve([err, null])
                    return;
                }
                resolve([null, data])
            })
        })
    }
    
    static run(sql: string){
        return new Promise<[err: any, result: any]>(async (resolve, reject)=>{
            const db = await getSqliteDb();
            db.run(sql, function (err: any, data: any) {
                if (err) {
                    resolve([err, null])
                    return;
                }
                resolve([null, data])
            })
        })
    }
   
    static get(sql: string){
        return new Promise<[err: any, result: any]>(async (resolve, reject)=>{
            const db = await getSqliteDb();
            db.get(sql, function (err: any, data: any) {
                if (err) {
                    resolve([err, null])
                    return;
                }
                resolve([null, data])
            })
        })
    }
}

export default BaseSQLite



// async updateOne(filter: { fieldName: string; value: any }) {
//     let keyValue = "";
//     const data = { ...this };
//     for (const dataKey in data) {
//         // ignore tableName field
//         if (dataKey !== "tableName" && dataKey !== "createdAt") {
//             keyValue += `${dataKey} = '${data[dataKey]}', `;
//         }
//     }
//
//
//         // trim last comma
//         keyValue = keyValue.slice(0, -2);
//
//         let tableName = this.tableName;
//
//         let sql = `UPDATE ${tableName} SET ${keyValue} where ${filter.fieldName} = "${filter.value}" `;
//
//