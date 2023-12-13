const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const mfrController = require('../controllers/mfrController');

const router = express.Router();

router
    .get(
        '/homepage',
        authController.protect,
        authController.requireRole('製造商'),
        mfrController.homepageController,
    )
    .get(
        '/orderhistory',
        authController.protect,
        authController.requireRole('製造商'),
        mfrController.orderHistory,
    )
    .post(
        '/orderhistory/:orderId',
        authController.protect,
        authController.requireRole('製造商'),
        mfrController.orderUpdateStatus,
    )
    .get(
        '/orderhistory/:orderId',
        authController.protect,
        authController.requireRole('製造商'),
        mfrController.orderBlockChainHistory,
    );

module.exports = router;
