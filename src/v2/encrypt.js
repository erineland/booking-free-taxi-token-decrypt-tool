const argv = require('yargs').argv;
const readline = require('readline');
const Config = require('@rides/node-config').default;
const { BkngToken } = require('@bookingcom/bkng-crypto');

const config = new Config({
    region: argv.region || 'eu-west-1',
    env: argv.env || 'qa',
    platform: 'web',
    appName: 'grandcentral',
    enableSSM: true,
    localConfig: {},
});

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

cli.question('Enter the payload to encrypt: ', async payload => {
    console.log();

    try {
        const passphrase = argv.passphrase || await config.valueFor('booking.freeTaxiTokenPassphrase');
        const iv = argv.iv || await config.valueFor('booking.freeTaxiTokenIV');
        const bkngToken = new BkngToken(passphrase, iv);
        const encryptedToken = await bkngToken.encrypt(payload);

        console.log('###################### ENCRYPTED TOKEN #######################');
        console.log(encryptedToken);
        console.log('##############################################################');
    } catch (err) {
        console.error(err);
    }

    cli.close();
});
