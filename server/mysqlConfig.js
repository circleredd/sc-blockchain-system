const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const config = {
    host: process.env.MYSQL1_HOST,
    port: '1',
    user: 'dev',
    password: process.env.MYSQL1_PASSWORD,
    database: 'mydatabase',
    waitForConnections: true,
    connectionLimit: 10, // 連接池最大連接數量，預設為10
    queueLimit: 0, // 如果連接池沒有連接可用，則設置為無限制，預設為0

    Promise: global.Promise,
};

// 創建連接池
const pool = mysql.createPool(config);

// 用於執行查詢的函數
const query = async (sql, params) => {
    const [rows, fields] = await pool.query(sql, params);
    return [rows, fields];
};

module.exports = {
    query, // 導出查詢函數
    pool, // 如有需要，也可以導出整個連接池
};

/* promise版本，不使用連接池
// 使用 async function 來處理連接
const connectToDatabase = async () => {
    try {
        const connection = await mysql.createConnection(config);
        console.log('MySQL Connected!');
        return connection;
    } catch (err) {
        console.error('MySQL Connection Failed: ', err.message);
        // 根據您的應用需求，您可能想要在這裡添加更多的錯誤處理邏輯
        // 例如重新連接、退出應用程序等
    }
};

// 立即調用函數並將返回的 promise 導出，因此在別的file中呼叫需要await
const connectionPromise = connectToDatabase();

module.exports = {
    connection: connectionPromise,
};
*/

/*非promise版本

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const config = {
    host: process.env.MYSQL1_HOST,
    port: '3306',
    user: 'dev',
    password: process.env.MYSQL1_PASSWORD,
    database: 'mydatabase',
};
const connection = mysql.createConnection(config);
連接到192.168.10.102:3306的sql資料庫
const connection = mysql.createConnection({
    host: process.env.MYSQL1_HOST,
    port: '3306',
    user: 'dev',
    password: process.env.MYSQL1_PASSWORD,
    database: 'mydatabase',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

module.exports = {
    connection: connection,
// };

*/
