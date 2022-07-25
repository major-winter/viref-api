var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var app = express();

const databaseUri = "mongodb://admin:iMS4F5qFHt3pjqO2Ec2b55Ts@MongoS3601A.back4app.com:27017/a93d2ae265d74fda82e7fe4d322bf1d7"
const config = {
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'Z4JgilyPeBPCyoHgN2D8uFfXsCs77S2bzczczkUW',
  masterKey: process.env.MASTER_KEY || '1MYnluFjy5eus4QB1kVukfQ2WoKwkMd4DctdosVb', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
};
// var api = new ParseServer({
//   databaseURI:
//     "mongodb://admin:iMS4F5qFHt3pjqO2Ec2b55Ts@MongoS3601A.back4app.com:27017/a93d2ae265d74fda82e7fe4d322bf1d7", // Connection string for your MongoDB database
//   appId: "Z4JgilyPeBPCyoHgN2D8uFfXsCs77S2bzczczkUW",
//   masterKey: "1MYnluFjy5eus4QB1kVukfQ2WoKwkMd4DctdosVb",
//   serverURL: "https://viref.herokuapp.com/parse",
//   restAPIKey: "mZSMu9AMEajWWgbGyS5DBloTLcyc2jyJCDasTUoH",
//   cloud: __dirname + '/cloud/main.js',
// });
// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';
const api = new ParseServer(config);
app.use(mountPath, api);

app.get('/', (req, res) => {
  res.status(200).send("Hello to vref")
})
app.listen(process.env.PORT || 5000, function () {
  console.log("parse-server-example running on port " + process.env.PORT);
});
