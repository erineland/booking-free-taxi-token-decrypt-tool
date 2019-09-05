const decryptor = require('../src/v2/decryptor');

const phoneTokenToDecrypt = 'izcv5O6lG2SG9xJgSojiwk9u5fMhgyeXoAvDMx1BgXE';
const expectedCellphone = "+44 99999 60001";
const passphrase = "this is the passphrase for cellphone encryption lol";
const iv = "testingg";

describe('When both a token and a passphrase are supplied and phone arg is pass', () => {
    it('Should return an decrypted phone body', async () => {
        let result;
        const tokenToDecrypt = phoneTokenToDecrypt;
        try {
            result = await decryptor.decryptToken(tokenToDecrypt, {
                passphrase,
                iv
            });
        } catch (error) {
            result = error;
        }
        expect(result.cellphone).toBe(expectedCellphone);
    });
});