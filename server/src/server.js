var app = require("./app/app");
var PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", function () { return console.log("server is running on port " + PORT); });
