import mysql from "mysql2";

// Create pool connection to the database
const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "portfolio",
    multipleStatements: true,
  })
  .promise();

pool
  .getConnection()
  .then((conn) => {
    const res = conn.query("SELECT 1");
    conn.release();
    return res;
  })
  .then((results) => {
    console.log("Connected to Portfolio DB");
  })
  .catch((err) => {
    console.log(err);
  });

export default pool;
