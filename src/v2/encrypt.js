const readline = require('readline');
const argv = require('yargs').argv;
const moment = require('moment');
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

cli.question('Enter the payload to encrypt: ', async input => {
    console.log();

    try {
        const payload = JSON.parse(input);
        payload.timeGenerated = moment.utc().format();
        payload.generatedBy = 'BookingGo';

        const passphrase = argv.passphrase || await config.valueFor('booking.freeTaxiTokenPassphrase');
        const iv = argv.iv || await config.valueFor('booking.freeTaxiTokenIV');
        const bkngToken = new BkngToken(passphrase, iv);
        const encryptedToken = await bkngToken.encrypt(JSON.stringify(payload));

        console.log('###################### ENCRYPTED TOKEN #######################');
        console.log(encryptedToken);
        console.log('##############################################################');
    } catch (err) {
        console.error(err);
    }

    cli.close();
});
