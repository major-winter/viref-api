var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var app = express();
console.log(process.cwd() + '/cloud/main.js')
const cloudPath = process.cwd() + '/cloud/main.js'
var api = new ParseServer({
  databaseURI:
    "mongodb://admin:iMS4F5qFHt3pjqO2Ec2b55Ts@MongoS3601A.back4app.com:27017/a93d2ae265d74fda82e7fe4d322bf1d7", // Connection string for your MongoDB database
  appId: "Z4JgilyPeBPCyoHgN2D8uFfXsCs77S2bzczczkUW",
  masterKey: "1MYnluFjy5eus4QB1kVukfQ2WoKwkMd4DctdosVb",
  serverURL: "https://viref.herokuapp.com/parse",
  restAPIKey: "mZSMu9AMEajWWgbGyS5DBloTLcyc2jyJCDasTUoH",
  cloud: process.env.CLOUD_CODE_MAIN || cloudPath,
});
// Serve the Parse API on the /parse URL prefix
app.use("/parse", api);
app.get('/', (req, res) => {
  res.status(200).send("Hello to vref")
})
app.listen(process.env.PORT || 5000, function () {
  console.log("parse-server-example running on port " + process.env.PORT);
});
