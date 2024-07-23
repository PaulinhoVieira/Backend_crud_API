const mysql = require('mysql');

const dbconn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbdavipaulo'
})

dbconn.connect((err) => {
  if(err){
    console.log(err);
  } else {
    console.log('conectado com sucesso ao banco');
  }
})

module.exports = dbconn;