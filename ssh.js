import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

function connectionQuery(sqlQuery) {
  return new Promise(function (resolve, reject) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Cooliest7!",
      database: "budget_app",
    });
    con.connect(function (err) {
      if (err) throw err;
      con.query(sqlQuery, function (err, rows) {
        if (err) {
          console.log(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}
export default connectionQuery;