const decryptUtil = require('../src/decryptUtil');
const testPassphrase = 'I been feeling it since 1966, now';
const testEncryptedToken = 'c11c51186e0ff651b5c43d14e8b34dd5203ad8ce470bc1c79a231976adea231f4dba7b940c332f68b8cd012c67a62746a126762704a9eeaff1319cf2b968f8cbcd89992d0ad36ac77fdb90e50ce3e2825a88330217ee855bec43553472119337a01772361229dfdaa977d53ef9f1ef49cc7c8611145a6f4c08b1753c995f213eedfc5faef08f3ecb51ddb05b3a959a5768f73caff5e2ac4ef22820ce2712e0435456cea8e3f0bc583a17e179e4f1a64fa295d8e0177513563136cbe38b76b086f9319b9d3161b51c3da3f2a02f902d096ce61a6f401472663b1290a173be9b117571d518d0957ca80d7bccec967357363950dac304ac7b0fb35e0b3c00a2b7c0bf068cbf1e63a450d33b17086398572b198115ba1cedf1520fa5f44248c4ba55a2e32c3ecba5295a12070fad04da35c71dbd76ab99750e7903d155b5ea6823e9b750b4129d26c63811781ac8d78288bd';
const expectedDecryptedBody = {
    affiliateBookingReference: '123456789',
    language: 'en-gb',
    pickup: {
        iata: 'MAN',
        date: '2019-05-21',
        passengers: 2,
    },
    dropoff: {
        lat: '53.4750868',
        lng: '-2.2533695',
        hotelName: 'Some Hotel That Doesn\'t Exist',
    },
    passenger: {
        email: 'ridewaystestteam@gmail.com',
        phone: '7000000000',
        title: 'Mr',
        firstName: 'Test',
        lastName: 'Team',
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
                    result = await decryptUtil.decrypt(testEncryptedToken);
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
                    result = await decryptUtil.decrypt(testEncryptedToken, testPassphrase);
                } catch (error) {
                    result = error;
                }

                expect(result).toMatch(JSON.stringify(expectedDecryptedBody));
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

                    expect(result).toBe(testEncryptedToken);
                });
            });
        });
    })
});
