const ethers = require('ethers');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const JsonArrayContractAbi = require('../../build/contracts/Order.json').abi;

const JsonArrayAddr = process.env.ORDER_CONTRACT_ADDR;

const customerPrivateKey = process.env.CUSTOMER_PRIVATE_KEY;
const manufacturerPrivateKey = process.env.MANUFACTURER_PRIVATE_KEY;
const supplierPrivateKey = process.env.SUPPLIER_PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

// console.log(JsonArrayAddr);
// console.log(customerPrivateKey);
// console.log(manufacturerPrivateKey);
// console.log(supplierPrivateKey);

// 訂單初始化
exports.uploadOrder = async (orderId, orderData) => {
    const wallet = new ethers.Wallet(customerPrivateKey, provider);

    const contract = new ethers.Contract(
        JsonArrayAddr,
        JsonArrayContractAbi,
        wallet,
    );
    try {
        // 呼叫合約函數
        const tx = await contract.addRecord(orderId, orderData);

        // 等待交易確認
        await tx.wait();

        console.log(`JsonData successfully set in the contract!`);
    } catch (error) {
        console.error('Error setting random number:', error);
    }
};

// 訂單履歷查詢(整個ROW)
exports.getOrdersById = async (orderId) => {
    const wallet = new ethers.Wallet(customerPrivateKey, provider);

    const contract = new ethers.Contract(
        JsonArrayAddr,
        JsonArrayContractAbi,
        wallet,
    );
    try {
        // 呼叫合約函數
        // const number = await contract.getRecordCount(1);
        // const record = await contract.getRecord(1, number - 1);
        const records = await contract.getRowRecords(orderId);
        console.log(records);
        console.log(`JsonData get successfully !`);
        return records;
    } catch (error) {
        console.error('Error setting random number:', error);
    }
};

// 訂單狀態更新
exports.updateOrder = async (orderId, statusStr) => {
    const wallet = new ethers.Wallet(manufacturerPrivateKey, provider);

    const contract = new ethers.Contract(
        JsonArrayAddr,
        JsonArrayContractAbi,
        wallet,
    );

    try {
        // 呼叫合約函數
        const tx = await contract.updateRecord(orderId, statusStr);

        // 等待交易確認
        await tx.wait();

        console.log(`JsonData successfully set in the contract!`);
    } catch (error) {
        console.error('Error setting random number:', error);
    }
};
