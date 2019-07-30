## Up and Running
* Pull the repo
* Run `npm install`

## Free Taxi v2 Tokens

### Decrypt

```
npm run decrypt
```

You will then be prompted for the token to decrypt, e.g.
```
iYuVKLMx51MD6plBZQSxf3FbmEgS0Fe1HuQpxIzEyelB2vWTcWe9JGcpZADDmY_vBlbv4tohS7uJYmDrOw__TKSyBurwfD3kITZG_mUgJ06dK_vtsNUuet7dFy8Pmib-dcR5It1BvVGRGsgwG4-EQBcMtKflKzLRnxRr24xWJlD1sEaw0AO-l_G2MSI8u4ic-czEH3iN4BOsenTBH--TyD-d-OVLZkvdDQs9xKqpjs0f4l6uyDKUU4P5r7of6kXf391U3ike5cVchUd-11BFey4KA00LcZUupew14BnxJLEITc5tf5iBvNXleeMGMheqJzwREjVMAa4c5mt2bsNxR-HoYxFiZDAf48ByIWGesQ-I3_DvRoAKiR31z8tKLp8uhRpRrgnjPAnKSyQtF_1_ATEQWQD0lvqP_QLGH5WK5qHrHlyDyoCpw18IitKtJ65ptJk6j5T5Ft05F0vq9ofbTLqCzHAU47QMCS6_sPCcMTY6twhyDVgJ98s8dLP7Ar-LxPCmtwqhlWrx45vBXY6tzg
```

### Encrypt

```
npm run encrypt
```

You will then be prompted for the data to encrypt, e.g.
```
{"affiliateBookingReference":"123456789","language":"en-gb","pickup":{"iata":"MAN","date":"2019-05-21","passengers":2},"dropoff":{"lat":"53.4750868","lng":"-2.2533695","hotelName":"Hilton Deansgate"},"passenger":{"email":"ridewaystestteam@gmail.com","phone":"+44 11349 60000","title":"Mr","firstName":"Test","lastName":"Team"}}
```

You can also pass the path to a json file containing the data to encrypt:

```
npm run encrypt -- --file ./example-free-taxi-booking-data.json
```

If you don't include an `affiliateBookingReference`, a random ten-digit one will be generated for you.

If you don't include an `pickup.date`, a date 21 days in the future will be generated for you.

#### Environment Specific Free Taxi Token Generation (Encryption)

As a set of shortcuts, you can generate Free Taxi tokens, with randomly generated booking references and a valid pickup date 21 days in the future, via the commands:

```
npm run generate-dev-free-taxi-token
npm run generate-qa-free-taxi-token
npm run generate-prod-free-taxi-token
```

*You will need local AWS SDK access to the DEV/QA/PROD environments setup on your machine*

### Options

By default the AWS credentials on your local machine will be used to get the passphrase and initialisation vector from the QA environment.

If you want to use different values to those above, or retrieve them from a different environment, can pass flags to do so. E.g.

```
npm run decrypt -- --passphrase "Some other passphrase" --iv "testing\!"
```

```
npm run encrypt -- --env "prod"
```

| flag | default | description |
| --- | --- | --- |
| --env | "qa" | The environment to get the credentials from |
| --region | "eu-west-1" | The AWS region to use when getting the credentials |
| --passphrase | value retrieved from SSM | Passphrase to use |
| --iv | value retrieved from SSM | Initialisation vector to use |

## Free Taxi v1 Tokens

* Decrypt some data via: `node index.js 'decrypt' 'somestringtodecrypt' 'somedecryptionpassphrase'`
* Encrypt some data via: `node index.js 'encrypt' 'somestringtoencrypt' 'someencryptionpassphrase'`,

### Example

```
node index.js 'decrypt' 'c11c51186e0ff651b5c43d14e8b34dd5203ad8ce470bc1c79a231976adea231f4dba7b940c332f68b8cd012c67a62746a126762704a9eeaff1319cf2b968f8cbcd89992d0ad36ac77fdb90e50ce3e2825a88330217ee855bec43553472119337a01772361229dfdaa977d53ef9f1ef49cc7c8611145a6f4c08b1753c995f213eedfc5faef08f3ecb51ddb05b3a959a5768f73caff5e2ac4ef22820ce2712e0435456cea8e3f0bc583a17e179e4f1a64fa295d8e0177513563136cbe38b76b086f9319b9d3161b51c3da3f2a02f902d096ce61a6f401472663b1290a173be9b117571d518d0957ca80d7bccec967357363950dac304ac7b0fb35e0b3c00a2b7c0bf068cbf1e63a450d33b17086398572b198115ba1cedf1520fa5f44248c4ba55a2e32c3ecba5295a12070fad04da35c71dbd76ab99750e7903d155b5ea6823e9b750b4129d26c63811781ac8d78288bdc11c51186e0ff651b5c43d14e8b34dd5203ad8ce470bc1c79a231976adea231f4dba7b940c332f68b8cd012c67a62746a126762704a9eeaff1319cf2b968f8cbcd89992d0ad36ac77fdb90e50ce3e2825a88330217ee855bec43553472119337a01772361229dfdaa977d53ef9f1ef49cc7c8611145a6f4c08b1753c995f213eedfc5faef08f3ecb51ddb05b3a959a5768f73caff5e2ac4ef22820ce2712e0435456cea8e3f0bc583a17e179e4f1a64fa295d8e0177513563136cbe38b76b086f9319b9d3161b51c3da3f2a02f902d096ce61a6f401472663b1290a173be9b117571d518d0957ca80d7bccec967357363950dac304ac7b0fb35e0b3c00a2b7c0bf068cbf1e63a450d33b17086398572b198115ba1cedf1520fa5f44248c4ba55a2e32c3ecba5295a12070fad04da35c71dbd76ab99750e7903d155b5ea6823e9b750b4129d26c63811781ac8d78288bd' 'I been feeling it since 1966, now'
```
