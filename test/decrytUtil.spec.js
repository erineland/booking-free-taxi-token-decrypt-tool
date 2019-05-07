const decryptUtil = require('../src/decryptUtil');

const testPassphrase = 'I been feeling it since 1966, now';
const testTokenToDecrypt = 'c11c51186e0ff651b5c43d14e8b34dd5203ad8ce470bc1c79a231976adea231f4dba7b940c332f68b8cd012c67a62746a126762704a9eeaff1319cf2b968f8cbcd89992d0ad36ac77fdb90e50ce3e2825a88330217ee855bec43553472119337a01772361229dfdaa977d53ef9f1ef49cc7c8611145a6f4c08b1753c995f213eedfc5faef08f3ecb51ddb05b3a959a5768f73caff5e2ac4ef22820ce2712e0435456cea8e3f0bc583a17e179e4f1a64fa295d8e0177513563136cbe38b76b086f9319b9d3161b51c3da3f2a02f902d096ce61a6f401472663b1290a173be9b117571d518d0957ca80d7bccec967357363950dac304ac7b0fb35e0b3c00a2b7c0bf068cbf1e63a450d33b17086398572b198115ba1cedf1520fa5f44248c4ba55a2e32c3ecba5295a12070fad04da35c71dbd76ab99750e7903d155b5ea6823e9b750b4129d26c63811781ac8d78288bd';
const testTokenToEncrypt = 'c11c51186e0ff651b5c43d14e8b34dd5203ad8ce470bc1c79a231976adea231fdaaabefd2af61917ee33c8b9e78f8cdcae0493a8d2a5e4e9f7f54447d1ae497daf453ac8df4cb0fa9742e214236e9a585f5f01f4a1719669c9231c7f799be35a154213dc421926ccee892fc17758c30275d13845b85da25216045f9f71bb59f1d42ac1b824fb545054fb5976ec1990eb2ae9fb310e650c710290380e3a916f337203390d106878d0f8a266c9d6e758bd000b9b81f1a7c66a3e2f5a3a96956ff5c7a218102eca39f2f54936e48cf4782d9273436a1489cc2b52ad152e6debf971052d182f8a47728dd8258b594f67a261c650d7919f95ca8c56e919f7c097e1aa72e0db176255d3ec980f44b26e501fa1ad5c16645fc91af27341a93d9cc1c28dfdb7fdcf7548a90fdb939f39d7c2c70c94af3546172fc1963f9832a44d46b6642813197045a34e7add40c55e59d060b3';
const expectedDecryptedBody = {
    affiliateBookingReference: '123456789',
    dropoff: {
        hotelName: 'Some Hotel That Doesn\'t Exist',
        lat: '53.4750868',
        lng: '-2.2533695',
    },
    language: 'en-gb',
    passenger: {
        email: 'ridewaystestteam@gmail.com',
        firstName: 'Test',
        lastName: 'Team',
        phone: '7000000000',
        title: 'Mr',
    },
    pickup: {
        date: '2019-05-21',
        iata: 'MAN',
        passengers: 2,
    },
};

describe('Decryption Utility', () => {
    describe('When decrypting some data', () => {
        describe('When a token is not supplied', () => {
            it('Should throw an error', async () => {
                const expectedTokenError = new Error('Please supply a token to decrypt');
                let result;
                try {
                    result = await decryptUtil.decrypt();
                } catch (error) {
                    result = error;
                }

                expect(result).toEqual(expectedTokenError);
            });
        });

        describe('When a passphrase is not supplied', () => {
            it('Should throw an error', async () => {
                const expectedPassphraseError = new Error('Please supply a passphrase to decrypt token');

                let result;
                try {
                    result = await decryptUtil.decrypt(testTokenToDecrypt);
                } catch (error) {
                    result = error;
                }

                expect(result).toEqual(expectedPassphraseError);
            });
        });

        describe('When both a token and a passphrase are supplied', () => {
            it('Should return a decrypted token body', async () => {
                let result;
                try {
                    result = await decryptUtil.decrypt(testTokenToDecrypt, testPassphrase);
                } catch (error) {
                    result = error;
                }

                expect(result).toEqual(expectedDecryptedBody);
            });
        });
    });

    describe('When encrypting some data', () => {
        describe('When an object to encrypt is not supplied', () => {
            it('Should throw an error', async () => {
                const expectedBodyError = new Error('Please supply some data to encrypt');
                let result;
                try {
                    result = await decryptUtil.encrypt();
                } catch (error) {
                    result = error;
                }

                expect(result).toEqual(expectedBodyError);
            });
        });

        describe('When a passphrase to encrypt some data is not supplied', () => {
            it('Should throw an error', async () => {
                const expectedPassphraseError = new Error('Please supply a passphrase to encrypt token with');
                let result;
                try {
                    result = await decryptUtil.encrypt(testPassphrase);
                } catch (error) {
                    result = error;
                }

                expect(result).toEqual(expectedPassphraseError);
            });
        });

        describe('When both a token and a passphrase are supplied', () => {
            it('Should return an encrypted body', async () => {
                let result;
                const bodyToEncrypt = JSON.stringify(expectedDecryptedBody);
                try {
                    result = await decryptUtil.encrypt(bodyToEncrypt, testPassphrase);
                } catch (error) {
                    result = error;
                }

                expect(result).toBe(testTokenToEncrypt);
            });
        });
    });
});
