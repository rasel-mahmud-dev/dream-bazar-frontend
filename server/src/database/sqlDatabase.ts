import staticDir from "../utilities/staticDir";

const path = require("path");

function sqlDatabase(){
    const sqlite3 = require('sqlite3').verbose();

    return new Promise((resolve, reject)=>{
        const dbPath = path.resolve( staticDir + "/db.db")
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err: any) => {

            if(err){
                reject(err)
            } else {
                resolve(db)
            }

            // if (err && err.code === "SQLITE_CANTOPEN") {
            // 	// var newdb = new sqlite3.Database(dbPath, (err) => {
            // 	// 	if (err) {
            // 	// 		console.log("Getting error " + err);
            // 	// 	}
            // 	// 	resolve(newdb)
            // 	// });
            // 	reject(err)
            // 	console.log("Getting error " + err);
            // } else if (err) {
            // 	reject(err)
            // 	console.log("Getting error " + err);
            // } else {
            // 	resolve(db)
            // 	return
            // }
        })
        // resolve(db)
    })
    // db.close();
}

export default sqlDatabase
