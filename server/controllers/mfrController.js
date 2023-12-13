const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const mysql1 = require('../mysqlConfig');
const query = require('../query');
const blockChain = require('../utils/uploadOrder');

exports.homepageController = catchAsync(async (req, res) => {
    res.status(200).json({
        time: Date(),
        content: ' 製造商首頁 ',
    });
});

exports.orderHistory = catchAsync(async (req, res) => {
    let result = await mysql1.query(query.mfrOrderHistory);
    result = result[0];

    res.status(200).json({
        data: result,
    });
});

exports.orderUpdateStatus = catchAsync(async (req, res) => {
    const { orderId } = req.params;
    const { message } = req.body;
    await mysql1.query(query.mfrUpdateOrderStatus, [message, orderId]);
    blockChain.updateOrder(orderId, message);
    res.status(200).json({
        time: Date(),
        content: ' 更新訂單狀態 ',
    });
});

exports.orderBlockChainHistory = catchAsync(async (req, res) => {
    const { orderId } = req.params;
    const result = await blockChain.getOrdersById(orderId);
    res.status(200).json({ data: result });
});
