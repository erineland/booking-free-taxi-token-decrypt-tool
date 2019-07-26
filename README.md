## Up and Running
* Pull the repo
* Run `npm install`

## Free Taxi v2 Tokens

```
npm run decrypt <token>
```

By default it uses the AWS credentials on your local machine to get the encryption key and initialisation vector from the QA environment.

### Options

If you want to use different values to those above, can pass flags to customise them, e.g.

```
npm run decrypt <token> -- --env prod --key "Some other passphrase" --iv 60bdbb11
```

| flag | default | description |
| --- | --- | --- |
| --env | "qa" | The environment to get the credentials from |
| --region | "eu-west-1" | The AWS region to use when getting the credentials |
| --key | value retrieved from SSM | Encryption key to use |
| --iv | value retrieved from SSM | Initialisation vector to use |

## Free Taxi v1 Tokens

* Decrypt some data via: `node index.js 'decrypt' 'somestringtodecrypt' 'somedecryptionpassphrase'`
* Encrypt some data via: `node index.js 'encrypt' 'somestringtoencrypt' 'someencryptionpassphrase'`,

### Example

```
node index.js 'decrypt' 'c11c51186e0ff651b5c43d14e8b34dd5203ad8ce470bc1c79a231976adea231f4dba7b940c332f68b8cd012c67a62746a126762704a9eeaff1319cf2b968f8cbcd89992d0ad36ac77fdb90e50ce3e2825a88330217ee855bec43553472119337a01772361229dfdaa977d53ef9f1ef49cc7c8611145a6f4c08b1753c995f213eedfc5faef08f3ecb51ddb05b3a959a5768f73caff5e2ac4ef22820ce2712e0435456cea8e3f0bc583a17e179e4f1a64fa295d8e0177513563136cbe38b76b086f9319b9d3161b51c3da3f2a02f902d096ce61a6f401472663b1290a173be9b117571d518d0957ca80d7bccec967357363950dac304ac7b0fb35e0b3c00a2b7c0bf068cbf1e63a450d33b17086398572b198115ba1cedf1520fa5f44248c4ba55a2e32c3ecba5295a12070fad04da35c71dbd76ab99750e7903d155b5ea6823e9b750b4129d26c63811781ac8d78288bdc11c51186e0ff651b5c43d14e8b34dd5203ad8ce470bc1c79a231976adea231f4dba7b940c332f68b8cd012c67a62746a126762704a9eeaff1319cf2b968f8cbcd89992d0ad36ac77fdb90e50ce3e2825a88330217ee855bec43553472119337a01772361229dfdaa977d53ef9f1ef49cc7c8611145a6f4c08b1753c995f213eedfc5faef08f3ecb51ddb05b3a959a5768f73caff5e2ac4ef22820ce2712e0435456cea8e3f0bc583a17e179e4f1a64fa295d8e0177513563136cbe38b76b086f9319b9d3161b51c3da3f2a02f902d096ce61a6f401472663b1290a173be9b117571d518d0957ca80d7bccec967357363950dac304ac7b0fb35e0b3c00a2b7c0bf068cbf1e63a450d33b17086398572b198115ba1cedf1520fa5f44248c4ba55a2e32c3ecba5295a12070fad04da35c71dbd76ab99750e7903d155b5ea6823e9b750b4129d26c63811781ac8d78288bd' 'I been feeling it since 1966, now'
```
