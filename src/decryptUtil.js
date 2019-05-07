var crypto = require('./util/crypto');

module.exports = async (encryptedToken, encryptedPassphrase) => {
    if (!encryptedToken) {
        throw new Error('Please supply a token to decrypt');
    }

    if (!encryptedPassphrase) {
        throw new Error('Please supply a passphrase to decrypt token');
    }

    const decryptedBody = crypto.decipher(
        encryptedToken,
        encryptedPassphrase
    );

    return JSON.parse(decryptedBody);
};
