const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.homePageController = catchAsync(async (req, res) => {
    res.status(200).json({
        time: Date(),
        content: ' ...............HOMEPAGE............... ',
    });
});
