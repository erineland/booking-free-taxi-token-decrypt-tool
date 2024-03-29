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

    return decryptedBody;
};


const encrypt = async (bodyToEncrypt, encryptionPassphrase) => {
    if (!bodyToEncrypt) {
        throw new Error('Please supply some data to encrypt');
    }

    if (!encryptionPassphrase) {
        throw new Error('Please supply a passphrase to encrypt token with');
    }

    const encryptedBody = crypto.cipher(
        bodyToEncrypt,
        encryptionPassphrase
    );

    return encryptedBody;
};

module.exports.decrypt = decrypt;
module.exports.encrypt = encrypt;
