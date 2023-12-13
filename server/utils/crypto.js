const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

exports.encrypt = async (data) => {
    const algorithm = 'aes-256-cbc';
    const key = process.env.CRYPTO_KEY;
    const iv = process.env.CRYPTO_IV;

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = await cipher.update(
        JSON.stringify(data),
        'utf8',
        'hex',
    );
    encryptedData += cipher.final('hex');

    // console.log('Encrypted Data:', encryptedData);

    // Return both the encrypted data and the key/iv for later decryption
    return encryptedData;
};

exports.decrypt = async (encryptedData) => {
    const algorithm = 'aes-256-cbc';
    const key = process.env.CRYPTO_KEY;
    const iv = process.env.CRYPTO_IV;
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decryptedData = await decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    decryptedData = JSON.parse(decryptedData);
    // console.log('Decrypted Data:', decryptedData);
    return decryptedData;
};

// Usage
// async function main() {
//     const { encryptedData, key, iv } = await encrypt(obj);
//     await decrypt(encryptedData, key, iv);
//     const { encryptedDataArr, keyArr, ivArr } = await encryptArr(arr);
//     await decrypt(encryptedDataArr, keyArr, ivArr);
// }

// main();
