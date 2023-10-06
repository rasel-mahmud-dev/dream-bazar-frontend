let app = require("./app/app")

const PORT =  process.env.PORT || 4000

app.listen(PORT, "0.0.0.0", ()=>console.log("server is running on port " + PORT))


