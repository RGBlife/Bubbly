const mysql = require('mysql')
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

connection.connect(initialConnection);

const initialConnection = (err) => {
  if (err) throw err;
  console.log("Connected to database");
}

const initialiseDatabase = () => {
  connection.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
}

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

    // })
//   console.log('The solution is: ', rows[0].solution)