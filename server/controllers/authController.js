const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id, identity) =>
    jwt.sign({ id: id, identity: identity }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN, //1 hr
    });

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id, user.identity);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRES_IN * 1, //1 hr
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    //Adding token in header
    // res.setHeader('Authorization', `Bearer ${token}`);

    res.status(statusCode).json({
        status: 'success',
        token: token,
        user: {
            id: user._id,
            identity: user.identity,
        },
    });
};

const loginWithMetaMask = catchAsync(async (user, signature) => {
    // Check if publicAddress & nonce & signature exist
    if (!user.publicAddress || !user.nonce || !signature) return false;

    // get user's latest nonce from ethurem
    const provider = new ethers.providers.JsonRpcProvider(
        'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    );
    const nonceFromNetwork = await provider.getTransactionCount(
        user.publicAddress,
        'latest',
    );
});

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { name, password, identity, signature } = req.body;
    console.log(req.body);

    // Check if name and password is enter
    if (!name || !password)
        return next(new AppError('Please provide name and password!', 400));
    const user = await User.findOne({ name: name }).select('+password');

    // Check if identity is correct
    if (identity !== user.identity)
        return next(new AppError('Wrong identity!'), 401);

    // Check if user exists
    if (!user || !(await user.correctPassword(password)))
        return next(new AppError('Invalid name or password!'), 401);

    // if (!loginWithMetaMask(user, signature))
    //     return next(new AppError('Fail MetaMask authentication!'), 401);

    createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    //token -> req.cookies.jwt

    // 1) Getting token and check if it's there
    const token = req.cookies.jwt;
    if (!token)
        return next(
            new AppError(
                'You are not logged in! Please log in to get access.',
                401,
            ),
        );

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //decoded format -> { id: '651c4e746c6d352da481daaa', iat: 1696353909, exp: 1704129909 }

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
        return next(
            new AppError(
                'Ther user belongin to this token does no longer exist.',
                401,
            ),
        );

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat))
        return next(
            new AppError(
                'User recently changed password! Please log in again.',
                401,
            ),
        );

    //we can use it in the next middleware function
    req.user = {
        id: currentUser.id,
        name: currentUser.name,
        identity: currentUser.identity,
    };
    delete decoded.id;
    console.log('req', req.user);
    console.log('dec', decoded);

    //GRANT ACCESS TO PROTECTED ROUTE
    next();
});

exports.requireRole = (role) => (req, res, next) => {
    if (req.user && req.user.identity === role) next();
    else
        res.status(404).json({
            status: 'fail',
            message: 'Permission denied because of the wrong identity!',
        });
};

exports.logout = (req, res) => {
    // res.cookie('jwt', '', { maxAge: 1 });
    res.clearCookie('jwt');
    res.status(200).json({
        status: 'success',
    });
};
