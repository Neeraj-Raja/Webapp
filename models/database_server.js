var mysql = require("mysql2");
const dotenv = require('dotenv');
dotenv.config();

const dbName = process.env.DATABASE;

var conn;

function setConnection() {
    conn = mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASS,
      database: process.env.DATABASE,
    });
  
    conn.connect();
    // return connection;
}

function endConnection() {
    conn.end();
}

const addUser = async (fName, lName, uName, pass) => {
    setConnection();
    await conn.promise().query(
        `INSERT INTO ${dbName}.${process.env.USERTABLE} 
        (first_name, last_name, username, password, account_created, account_updated)         
        values ('${fName}','${lName}','${uName}','${pass}', now(), now());`);
    let res = await getUser();
    return res[0][0];
}
const checkUsername = async (username) => {
    setConnection();
    let res = await conn.promise().query(
        `SELECT id FROM ${dbName}.${process.env.USERTABLE} where username=${username}`);
    endConnection();
    return res[0][0];
}
const getUser = async () => {
    let res = await conn.promise().query(
        `SELECT * FROM ${dbName}.${process.env.USERTABLE} where id=LAST_INSERT_ID();`);
    endConnection();
    return res;
}
const getData = async (id) => {
    setConnection();
    let res = await conn.promise().query(
        `SELECT id, first_name, last_name, username, account_created, account_updated, password FROM ${dbName}.${process.env.USERTABLE} where id=${id}`);
    
    endConnection();
    return res[0][0];
}
const updateUserData = async (fName, lName, pass, id) => {
    setConnection();
    let res = await conn.promise().query(
        `UPDATE ${dbName}.${process.env.USERTABLE} SET first_name = '${fName}', last_name = '${lName}', password = '${pass}',  account_updated = now() WHERE id=${id}`);
    endConnection();
    return res[0][0];
}
const getDataCreds = async (username) => {
    setConnection();
    let res = await conn.promise().query(
        `SELECT password FROM ${dbName}.${process.env.USERTABLE} where username='${username}'`);
    endConnection();
    return res[0][0];
}

module.exports = {
    addUser,
    getUser,
    getDataCreds,
    getData,
    checkUsername,
    updateUserData
   
}