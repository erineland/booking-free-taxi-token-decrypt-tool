const {
    BkngToken
} = require('@bookingcom/bkng-crypto');
const argv = require('yargs').argv;

const decryptToken = async (token, cryptoValues) => {
    try {
        const bkngToken = new BkngToken(cryptoValues.passphrase, cryptoValues.iv);
        return await bkngToken.decrypt(token);
    } catch (err) {
        throw new Error(err);
    }
}

const getValuesFromConfig = async (config, phone) => {
    let passphrase;
    let iv;
    try {
        if (phone) {
            passphrase = argv.passphrase || await config.valueFor('booking.freeTaxiCellphonePassphrase');
            iv = argv.iv || await config.valueFor('booking.freeTaxiCellphoneIV');
        } else {
            passphrase = argv.passphrase || await config.valueFor('booking.freeTaxiTokenPassphrase');
            iv = argv.iv || await config.valueFor('booking.freeTaxiTokenIV');
        }
        return {
            passphrase,
            iv
        };
    } catch (err) {
        throw new Error(err);
    }
}
module.exports.decryptToken = decryptToken;
module.exports.getValuesFromConfig = getValuesFromConfig;