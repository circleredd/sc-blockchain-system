const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const mysql1 = require('../mysqlConfig');
const query = require('../query');
const blockChain = require('../utils/uploadOrder');

exports.homepageController = catchAsync(async (req, res) => {
    res.status(200).json({
        time: Date(),
        content: ' 供應商首頁 ',
    });
});

exports.orderHistory = catchAsync(async (req, res) => {
    const userId = req.user.id;
    let result = await mysql1.query(query.supplierOrderHistory, [userId]);
    result = result[0];

    res.status(200).json({
        data: result,
    });
});

exports.orderUpdateStatus = catchAsync(async (req, res) => {
    const { orderId } = req.params;
    await mysql1.query(query.supplierUpdateOrderStatus, [orderId]);
    blockChain.updateOrder(orderId, '運送中');
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
