import path from "path";

const isDev = process.env.NODE_ENV === "development"

const staticDir =  path.resolve("public/static")


// for vercel use static files from client static files
// const staticDir =  path.resolve(isDev ? "../client/public/static" : "dist/data")

export default staticDir