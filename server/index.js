
let app;
const isDev = process.env.NODE_ENV === "development"
if(isDev){
    app = require("./src/app")
} else{
    app = require("./dist/app");
}

// let dbPath = path.resolve('dist/data/db.db')
// function sqlDatabase(){
//     let db;
//     return new Promise((resolve, reject)=>{
//         db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
//             if(err){
//                 reject(err)
//             } else {
//                 console.log("sqlite database connected")
//                 resolve(db)
//             }
//         })
//     })
// }

const PORT =  process.env.PORT || 3000

app.listen(PORT, ()=>console.log("server is running on port " + PORT))

