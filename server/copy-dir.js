const fs  = require("fs-extra")

fs.copySync('src/data', "dist/data", {overwrite: true})
console.info("data dir copy to dist dir")

