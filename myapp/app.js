const express = require('express')
const app = express()
const port = 3000
// Get the client
const mysql = require('mysql2/promise');

// Create the connection to database
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'usuarios',
});
app.get('/', (req, res) => {
  res.send('inicio de cesion')
})
app.get('/login', async (req, res) => {
  const datos = req.query;
  try {
    const [results, fields] = await connection.query(
     " SELECT * FROM `usos` WHERE `usuario` = ? AND `clave` = ? ",
     [datos.usuario, datos.clave]
    );
  
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  }
  
  console.log(datos)
  res.send('inicio de secion 0')
})



app.listen(port, () => {
  console.log(`se inico el servidor en el puerto  ${port}`)
})