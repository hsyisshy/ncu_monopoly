
const express = require("express")
const path = require('path')
const app = express()
var exec = require('child_process').exec;

var PORT = process.env.port || 3000
 
// View Engine Setup 
app.set("views", path.join(__dirname))
app.set("view engine", "ejs")
 
app.get("/user", function (req, res) {
// http://localhost:3000/user?name=tsai&value=99
 
    var name = req.query.name
    var value = req.query.value
    // console.log('fuck',req.query)
    console.log("name :", name)
    console.log("value :", value)

    exec(`node js/zixuan/insertmysql.js ${name} ${value}`,
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
})
 
app.listen(PORT, function (error) {
    if (error) throw error
    console.log("Server created Successfully on PORT", PORT)
})