// Load in the util
const decryptUtil = require('./src/decryptUtil');

// Parse parameters
const action = process.argv[2];
console.log(`User is attempting to do: ${action}`);

const cryptoData = process.argv[3];
console.log(`Data to be encrypted/decrypted: ${cryptoData}`);

const passphrase = process.argv[4];
console.log(`Encryption passphrase to use: ${passphrase}`);

// Run the util
// Output the result to the console.
const runCryptoUtil = async (actionToRun, cryptoData, passphrase) => {
    let result;
    if (actionToRun === 'decrypt') {
        result = await decryptUtil.decrypt(cryptoData, passphrase);
        console.log(`\nThe decrypted data is: ${result}`);
        return;
    }
    if (actionToRun === 'encrypt') {
        result = await decryptUtil.encrypt(cryptoData, passphrase);
        console.log(`\nThe encrypted data is: ${result}`);
        return;
    }


    console.log('Please specify an action to run');
    return;
}

runCryptoUtil(action, cryptoData, passphrase);
