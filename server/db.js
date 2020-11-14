import mysql from 'mysql';

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database: 'proximatecentauri'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("MySql connected..!!!")
});

module.exports = db;