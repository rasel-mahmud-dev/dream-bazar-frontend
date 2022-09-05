import fs from "fs-extra"


fs.copySync('dist', "../server/public", {overwrite: true})
console.info("client bundler copy to root public dir")

