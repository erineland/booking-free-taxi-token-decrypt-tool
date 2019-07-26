const Config = require('@rides/node-config').default;
const argv = require('yargs').argv;
const { BkngToken } = require('@bookingcom/bkng-crypto');

const config = new Config({
    region: argv.region || 'eu-west-1',
    env: argv.env || 'qa',
    platform: 'web',
    appName: 'grandcentral',
    enableSSM: true,
    localConfig: {},
});

(async () => {
    const key = argv.key || await config.valueFor('booking.cookieSecret');
    const iv = argv.iv || await config.valueFor('booking.cookieIv');
    const bkngToken = new BkngToken(key, iv);

    const [token] = argv._;
    const decryptedToken = await bkngToken.decrypt(token);

    console.log(decryptedToken);
})();
