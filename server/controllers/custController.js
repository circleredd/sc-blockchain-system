const ethers = require('ethers');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const con = require('../mysqlConfig');
const query = require('../query');
const crypto = require('../utils/crypto');
const blockChain = require('../utils/uploadOrder');

const mysql1 = con;

exports.homepageController = catchAsync(async (req, res) => {
    res.status(200).json({
        time: Date(),
        content: ' 客戶首頁 ',
    });
});

// 創建Bom
exports.bomCreate = catchAsync(async (req, res) => {
    /*req.body = [{ id: 1, component: '電阻a', quantity: '5' }, ...] */
    // const mysql1 = await con.connection;
    const userId = req.user.id;
    const { bomName } = req.body[req.body.length - 1];
    req.body.pop();
    const [result] = await mysql1.query(query.createBom, [
        bomName,
        `這是一張${bomName}bom表的說明`,
        userId,
    ]);
    // 從回傳的result中取得bomId
    const bomId = result.insertId;

    const insertValue = req.body.map((item) => [
        bomId,
        item.id,
        item.component,
        item.quantity,
    ]);

    // 將bom表元件組成objec加密
    const encryptedData = await crypto.encrypt(insertValue);
    // 將加密後的資料存入bom表
    await mysql1.query(query.insertEncryptedData, [encryptedData, bomId]);

    // 將bom表元件及數量存入bom_components表
    await mysql1.query(query.createBomComponents, [insertValue]);

    res.status(200).json({
        time: Date(),
        content: ' ...............makeorder............... ',
    });
});

// 回傳BomCreate的下拉選單中的元件
exports.requireComponents = catchAsync(async (req, res) => {
    // const mysql1 = await con.connection;
    let result = await mysql1.query('SELECT * FROM components');
    result = result[0];
    res.status(200).json({
        data: result,
    });
});

// 查詢Bom歷史紀錄
exports.bomHistory = catchAsync(async (req, res) => {
    const userId = req.user.id;
    // const mysql1 = await con.connection;
    // let result = await mysql1.query('SELECT * FROM bom WHERE customer_id = ?', [
    //     userId,
    // ]);
    let result = await mysql1.query(query.bomHistory, [userId]);
    result = result[0];

    res.status(200).json({
        data: result,
    });
});

// 查詢Bom詳細歷史紀錄by bomId
exports.bomHistoryDetail = catchAsync(async (req, res) => {
    const { bomId } = req.params;
    const userId = req.user.id;
    // const mysql1 = await con.connection;
    // let result = await mysql1.query(
    //     'SELECT * FROM bom_components WHERE bom_id = ?',
    //     [bomId],
    // );
    let result = await mysql1.query(query.bomHistoryDetail, [bomId]);
    result = result[0];
    console.log(result);

    res.status(200).json({
        data: result,
    });
});

//Datetime處理 -> YYYY-MM-DD HH:MI:SS
const dateFormate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
};

// 在Bom歷史頁面建立訂單
exports.orderCreate = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const order = req.body; // { bomId:22, yieldRate:'55', deliveryDate:'2023-11-29', total:664266}
    const currentDate = dateFormate();
    const orderID = Math.floor(Math.random() * (99999 - 1 + 1)) + 1;

    const result = await mysql1.query(query.orderCreate, [
        '訂單處理中',
        order.yieldRate,
        orderID,
        userId,
        '652d62b8189ae36143389800', // DEMO 預設供應商
        order.bomId,
        order.total,
        currentDate,
        order.deliveryDate,
    ]);

    let bomHash = await mysql1.query(query.getBomHash, [order.bomId]);
    bomHash = bomHash[0][0].hash;

    // upload to blockchain
    let toBlockChain = {
        orderID,
        customer_id: userId,
        supplier_id: '652d62b8189ae36143389800', // DEMO 預設供應商
        bomID: order.bomId,
        yieldRate: order.yieldRate,
        orderDate: currentDate,
        deliveryDate: order.deliveryDate,
        total: order.total,
        bomHash,
    };
    toBlockChain = JSON.stringify(toBlockChain);
    await blockChain.uploadOrder(orderID, toBlockChain);

    res.status(200).json({ data: result });
});

exports.orderHistory = catchAsync(async (req, res) => {
    const userId = req.user.id;
    let result = await mysql1.query(query.custOrderHistory, [userId]);
    result = result[0];

    res.status(200).json({
        data: result,
    });
});

exports.orderBlockChainHistory = catchAsync(async (req, res) => {
    const { orderId } = req.params;
    const result = await blockChain.getOrdersById(orderId);
    res.status(200).json({ data: result });
});
