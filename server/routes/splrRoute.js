const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const splrController = require('../controllers/splrController');

const router = express.Router();

router
    .get(
        '/homepage',
        authController.protect,
        authController.requireRole('供應商'),
        splrController.homepageController,
    )
    .get(
        '/orderhistory',
        authController.protect,
        authController.requireRole('供應商'),
        splrController.orderHistory,
    )
    // .get(
    //     '/orderhistory/:orderId',
    //     authController.protect,
    //     authController.requireRole('供應商'),
    //     splrController.orderHistoryDetail,
    // )
    .post(
        '/orderhistory/:orderId',
        authController.protect,
        authController.requireRole('供應商'),
        splrController.orderUpdateStatus,
    )
    .get(
        '/orderhistory/:orderId',
        authController.protect,
        authController.requireRole('供應商'),
        splrController.orderBlockChainHistory,
    );

module.exports = router;
