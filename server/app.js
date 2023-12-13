const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/userRoute');
const customerRoute = require('./routes/custRoute');
const manufacturerRoute = require('./routes/mfrRoute');
const supplierRoute = require('./routes/splrRoute');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// 1) Middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//可以與不同port的client傳遞資料
// app.use(cors());

app.use(
    cors({
        origin: 'http://localhost:3000', // 指定允許的來源
        exposedHeaders: ['Authorization'], //讓client可以看到及使用此header欄位
        credentials: true,
    }),
);

//Header Setting
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept',
//     );
//     next();
// });

app.use(cookieParser());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
app.use((req, res, next) => {
    console.log('This is the middleware🖥️🖥️🖥️');
    next();
});

// 2) Routes
app.use('/api', userRoute);
app.use('/api/customer', customerRoute);
app.use('/api/manufacturer', manufacturerRoute);
app.use('/api/supplier', supplierRoute);

// 3) Error URL handler
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} in this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
