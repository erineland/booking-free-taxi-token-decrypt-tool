const readline = require('readline');
const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const moment = require('moment');
const chalk = require('chalk');
const Config = require('@rides/node-config').default;
const { BkngToken } = require('@bookingcom/bkng-crypto');

const urls = {
    dev: 'https://taxi.dev.someonedrive.me',
    qa: 'https://taxi.qa.someonedrive.me',
    prod: 'https://taxi.booking.com',
    local: 'https://taxi-local.dev.booking.com',
};

const config = new Config({
    region: argv.region || 'eu-west-1',
    env: (argv.env === 'local' || argv.env === undefined) ? 'qa' : argv.env,
    platform: 'web',
    appName: 'grandcentral',
    enableSSM: true,
    localConfig: {},
});

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const encrypt = async input => {
    const payload = JSON.parse(input);
    payload.timeGenerated = moment.utc().format();
    payload.generatedBy = 'BookingGo';
    let toggleString = '';

    if (!payload.affiliateBookingReference) {
        payload.affiliateBookingReference = String(parseInt(Math.random() * 10000000000, 10));
    }

    if (!payload.pickup.date) {
        // Auto generate pickup date
        const daysInFutureToTravelOut = 21;
        const validCheckinMoment = moment();
        validCheckinMoment.add(daysInFutureToTravelOut, 'days');
        const validPickupDate = validCheckinMoment.format('YYYY-MM-DD');
        payload.pickup.date = validPickupDate;
    }

    if (argv.isMultiIata == 'true') {
        const multiIataPath = path.resolve('multiIata-data.json')
        const multiIataData = JSON.parse(fs.readFileSync(multiIataPath));
        payload.pickup = {
            ...payload.pickup,
            ...multiIataData
        }
        toggleString += '&rw-feature-toggle[free-taxi-multi-iata]=true'
    }

    console.log(chalk.blue('\n######################### TOKEN BODY #########################'));
    console.log(payload);
    console.log(chalk.blue('##############################################################'));

    const passphrase = argv.passphrase || await config.valueFor('booking.freeTaxiTokenPassphrase');
    const iv = argv.iv || await config.valueFor('booking.freeTaxiTokenIV');
    const bkngToken = new BkngToken(passphrase, iv);
    const encryptedToken = await bkngToken.encrypt(JSON.stringify(payload));

    const spyGlass = '&spyglass=true';
    if (argv.toggles != '' && argv.toggles) {
        const featureToggles = argv.toggles.split(' ');
        featureToggles.forEach(function (toggle) {
            const toggleToAdd = `&rw-feature-toggle[${toggle}]=true`;
            if (!toggleString.includes(toggleToAdd)) {
                toggleString += toggleToAdd;
            }
        });
    }

    console.log(chalk.yellow('\n###################### ENCRYPTED TOKEN #######################'));
    console.log(encryptedToken);
    console.log(chalk.yellow('##############################################################'));

    console.log(chalk.green('\n######################## REDEEM URL ##########################'));
    console.log(`${urls[argv.env || config.options.env]}/${payload.language}/promotions/free-taxi/${encryptedToken}?utm_source=booking.com&utm_medium=intra&utm_campaign=bookingfreetaxi-desktop&affiliateCode=bookingfreetaxi${spyGlass}${toggleString}`);
    console.log(chalk.green('##############################################################'));
}

if (argv.file) {
    (async () => {
        try {
            const filePath = path.resolve(argv.file);
            const input = fs.readFileSync(filePath);
            await encrypt(input);
            process.exit(0);
        } catch (err) {
            console.error(err);
            process.exit(2);
        }
    })();
} else {
    cli.question('Enter the payload to encrypt: ', async input => {
        try {
            await encrypt(input);
        } catch (err) {
            console.error(err);
        }
        cli.close();
    });
}
