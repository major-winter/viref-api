var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var app = express();
console.log(__dirname)
var api = new ParseServer({
  databaseURI:
    "mongodb://admin:iMS4F5qFHt3pjqO2Ec2b55Ts@MongoS3601A.back4app.com:27017/a93d2ae265d74fda82e7fe4d322bf1d7", // Connection string for your MongoDB database
  appId: "Z4JgilyPeBPCyoHgN2D8uFfXsCs77S2bzczczkUW",
  masterKey: "1MYnluFjy5eus4QB1kVukfQ2WoKwkMd4DctdosVb",
  serverURL: "https://viref.herokuapp.com/parse",
  restAPIKey: "mZSMu9AMEajWWgbGyS5DBloTLcyc2jyJCDasTUoH",
  cloud: __dirname + '/cloud/main.js',
});
// Serve the Parse API on the /parse URL prefix
app.use("/parse", api);
// app.listen(5000, function () {
//   console.log("parse-server-example running on port 5000");
// });
