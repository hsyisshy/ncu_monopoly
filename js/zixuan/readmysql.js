var mysql = require('mysql');
const fs =require('fs')

// argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
//   });

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bling_rank"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM ranking ORDER BY value DESC", function (err, result, fields) {
    if (err) throw err;
    result = JSON.parse(JSON.stringify(result) ) 
    // console.log(result)
    // console.log(result.slice(0,5).arr.sort( function(row1, row2) {
    //         var k1 = row1["value"], k2 = row2["value"];
    //         return (k1 > k2) ? 1 : ( (k2 > k1) ? -1 : 0 );
    //     } )) 

    fs.writeFileSync("result.json", JSON.stringify(result, null, '\t')); 

    process.exit(0);

  });
});

