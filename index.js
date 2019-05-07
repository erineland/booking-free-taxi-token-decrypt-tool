// Load in the util
const decryptUtil = require('./src/decryptUtil');

// Parse parameters
const action = process.argv[2];
console.log(`\nUser is attempting to: ${action}`);

const cryptoData = process.argv[3];
console.log(`\nData to be encrypted/decrypted: \n${cryptoData}`);

const passphrase = process.argv[4];
console.log(`\nEncryption passphrase to use: \n${passphrase}`);

// Run the util
// Output the result to the console.
const runCryptoUtil = async (actionToRun, cryptoData, passphrase) => {
    let result;
    if (actionToRun === 'decrypt') {
        result = await decryptUtil.decrypt(cryptoData, passphrase);
        console.log(`\nThe decrypted data: \n ${JSON.stringify(JSON.parse(result), null, 2)}`);
        return;
    }
    if (actionToRun === 'encrypt') {
        result = await decryptUtil.encrypt(cryptoData, passphrase);
        console.log(`\nThe encrypted data: \n ${JSON.stringify(JSON.parse(result), null, 2)}`);
        return;
    }


    console.log('Please specify an action to run');
    return;
}

runCryptoUtil(action, cryptoData, passphrase);


