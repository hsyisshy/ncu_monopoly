var mysql = require('mysql');
const param = process.argv;
// node js/zixuan/insertmysql.js name value
param.forEach((val, index) => {
      console.log(`${index}: ${val}`);
    });

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bling_rank"
});

function f1(d) {
  let year = d.getFullYear();
  let month = ("0" + (d.getMonth() + 1)).slice(-2); // Month is zero-based
  let day = ("0" + d.getDate()).slice(-2);
  let hour = ("0" + d.getHours()).slice(-2);
  let minute = ("0" + d.getMinutes()).slice(-2);
  let second = ("0" + d.getSeconds()).slice(-2);
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

con.connect(function(err) {
  if (err) throw err;
  console.log('time' , f1(new Date())+'.000000' )
  con.query("INSERT INTO `ranking` (`name`, `value`, `time`) "+
  `VALUES ('${param[2]}', '${param[3]}','${f1(new Date())+'.000000'}' );`, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    process.exit(0); 
  });
  
});

'2024-04-16 09:08:12.000000'