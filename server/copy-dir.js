const fs  = require("fs-extra")


fs.copySync('src/data', "dist/data", {overwrite: true})
console.info("client bundler copy to root public dir")

