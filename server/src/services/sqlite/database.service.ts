import path from "path";
import dataDir from "../../utilities/dataDir";


export let db: any;

export  async function getSqliteDb(){
    if(!db){
        try {
            db = await sqlDatabase()
        }catch (ex){
            return db;
        }
    }
    return db;
}

function sqlDatabase(){
    const sqlite3 = require('sqlite3').verbose();

    return new Promise((resolve, reject)=>{
        const dbPath = path.resolve(dataDir + "/db.db")
        db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err: any) => {
            if(err){
                reject(err)
            } else {
                console.log("sqlite database connected")
                resolve(db)
            }
        })
    })
}

export default sqlDatabase