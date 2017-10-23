const mysql = require('mysql');

let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "jm739721041307",
    port: 3306,
    database: "sistema_notas_v03",
    multipleStatements: true
});

conn.connect(function(err){
    if(err) throw err;
    console.log('Conectado con base de datos');
})

module.exports = conn;