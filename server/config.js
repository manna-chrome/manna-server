import mysql from "mysql2";
require("dotenv").config();

// will have to change these to env variables
let conn;
function connect() {
  if (!conn) {
    conn = mysql.createConnection({
      host: process.env.DB_HOST,
      port: "3306",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
  }
  if (process.env.NODE_ENV == "development") {
    console.log("DB Connection Formed");
  }
  return conn;
}

export default { connect };
