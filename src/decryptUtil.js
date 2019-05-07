var crypto = require('./util/crypto');

const decrypt = async (encryptedToken, encryptedPassphrase) => {
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


const encrypt = async (bodyToEncrypt, encryptedPassphrase) => {
    if (!bodyToEncrypt) {
        throw new Error('Please supply some data to encrypt');
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

module.exports.decrypt = decrypt;
module.exports.encrypt = encrypt;
