const argv = require('yargs').argv;
const readline = require('readline');
const chalk = require('chalk');
const Config = require('@rides/node-config').default;
const decryptor = require('./decryptor');
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

    try {
        await decryptor.getValuesFromConfig(config, argv.phone).then(async (cryptoValues) => {
            const decryptedToken = await decryptor.decryptToken(token, cryptoValues);
            console.log(chalk.blue('######################### TOKEN BODY #########################'));
            console.log(decryptedToken);
            console.log(chalk.blue('##############################################################'));
        });
    } catch (err) {
        console.error(chalk.red(err));
    }

    cli.close();
});
