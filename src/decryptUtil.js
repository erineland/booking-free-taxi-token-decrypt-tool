module.exports = async  (encryptedToken) => {
    if (!encryptedToken) {
        throw new Error('Please supply a token to decrypt');
    }
};
