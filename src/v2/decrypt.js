const argv = require('yargs').argv;
const readline = require('readline');
const chalk = require('chalk');
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

cli.question('Enter the token to decrypt: ', async token => {
    console.log();

    let passphrase;
    let iv;
    try {

        if (argv.phone) {
            passphrase = argv.passphrase || await config.valueFor('booking.freeTaxiCellphonePassphrase');
            iv = argv.iv || await config.valueFor('booking.freeTaxiCellphoneIV');
        } else {
            passphrase = argv.passphrase || await config.valueFor('booking.freeTaxiTokenPassphrase');
            iv = argv.iv || await config.valueFor('booking.freeTaxiTokenIV');
        }

        const bkngToken = new BkngToken(passphrase, iv);
        const decryptedToken = await bkngToken.decrypt(token);
        
        console.log(chalk.blue('######################### TOKEN BODY #########################'));
        console.log(decryptedToken);
        console.log(chalk.blue('##############################################################'));
    } catch (err) {
        console.error(chalk.red(err));
    }

    cli.close();
});
