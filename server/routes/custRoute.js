const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const custController = require('../controllers/custController');

const router = express.Router();

router
    .get(
        '/authentication',
        authController.protect,
        authController.requireRole('客戶'),
        (req, res) => {
            res.status(200).json({
                time: Date(),
            });
        },
    )

    .get(
        '/homepage',
        authController.protect,
        authController.requireRole('客戶'),
        custController.homepageController,
    )
    .get('/profile', authController.protect, authController.requireRole('客戶'))
    .get(
        '/requirecomponents',
        authController.protect,
        authController.requireRole('客戶'),
        custController.requireComponents,
    )
    .post(
        '/bomcreate',
        authController.protect,
        authController.requireRole('客戶'),
        custController.bomCreate,
    )
    .get(
        '/bomhistory',
        authController.protect,
        authController.requireRole('客戶'),
        custController.bomHistory,
    )
    .get(
        '/bomhistory/:bomId',
        authController.protect,
        authController.requireRole('客戶'),
        custController.bomHistoryDetail,
    )
    .post(
        '/ordercreate',
        authController.protect,
        authController.requireRole('客戶'),
        custController.orderCreate,
    )
    .get(
        '/orderhistory',
        authController.protect,
        authController.requireRole('客戶'),
        custController.orderHistory,
    )
    // .post( // 這個路由是給製造商和供應商updata Status用的
    //     '/orderhistory/:orderId',
    //     authController.protect,
    //     authController.requireRole('客戶'),
    //     custController.orderUpdateStatus,
    // )
    .get(
        '/orderhistory/:orderId',
        authController.protect,
        authController.requireRole('客戶'),
        custController.orderBlockChainHistory,
    );
module.exports = router;
