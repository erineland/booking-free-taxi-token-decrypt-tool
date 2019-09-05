const argv = require('yargs').argv;
const readline = require('readline');
const chalk = require('chalk');
const Config = require('@rides/node-config').default;
const { BkngToken } = require('@bookingcom/bkng-crypto');

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

cli.question('Enter the token to decrypt: ', async token => {
    const config = new Config({
        region: argv.region || 'eu-west-1',
        env: argv.env || 'qa',
        platform: 'web',
        appName: 'grandcentral',
        enableSSM: true,
        localConfig: {},
    });

    let decryptedToken;

    try {
        const cryptoValues = await getValuesFromConfig(config, argv.phone);
        decryptedToken = await decryptToken(token, cryptoValues);
    } catch (err) {
        console.error(chalk.red(err));
    }

    if (decryptedToken) {
        console.log(chalk.blue('######################### TOKEN BODY #########################'));
        console.log(decryptedToken);
        console.log(chalk.blue('##############################################################'));
    }

    cli.close();
});

const decryptToken = async (token, cryptoValues) => {
    try {
        const bkngToken = new BkngToken(cryptoValues.passphrase, cryptoValues.iv);
        return await bkngToken.decrypt(token);
    } catch (err) {
        console.error(chalk.red(err));
    }
}

const getValuesFromConfig = async (config, phone) => {
    let passphrase;
    let iv;
    if (phone) {
        passphrase = argv.passphrase || await config.valueFor('booking.freeTaxiCellphonePassphrase');
        iv = argv.iv || await config.valueFor('booking.freeTaxiCellphoneIV');
    } else {
        passphrase = argv.passphrase || await config.valueFor('booking.freeTaxiTokenPassphrase');
        iv = argv.iv || await config.valueFor('booking.freeTaxiTokenIV');
    }
    return { passphrase, iv };
}

module.exports.decryptToken = decryptToken;