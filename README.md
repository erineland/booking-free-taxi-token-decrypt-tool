## Up and Running
* Pull the repo
* Run `npm install`

## Free Taxi v2 Tokens
Depending on your AWS CLI setup, it might be easiest to manually pass in the passphrase and IV for whatever environment you're working on. See the Options section below.

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

## Options

### Passphrase and IV
You can manually get the passphrase and IV from AWS and pass them in so you don't have to worry about your AWS CLI setup, but this is more time consuming

[Details on how to get these values from AWS here](https://karmigo.atlassian.net/wiki/spaces/BI/pages/1189478414/Free-Taxi+Experiment+Runbook)
```
npm run decrypt -- --passphrase "Some other passphrase" --iv "testing\!"
```

If you don't pass in these values, the tool will attempt to fetch them from AWS using the credentials you have set up for your `default` AWS CLI profile,  [more info here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) 

By default it will attempt to get the values for QA, but you can specify the environment using the `env` flag
```
npm run encrypt -- --env "prod"
```

So for example if the default profile has your `prod` credentials set and you are trying to decrypt a `prod` token, you only need to run the command above without passing in passphrase/IV. If you're comfortable doing so it may be best to set your default credentials to the environment you are currently working in so you don't have to manually grab them from AWS all the time.

If you want to use different values to those above, or retrieve them from a different environment, can pass flags to do so. E.g.
### Cellphone
You can use the tool to decrypt an encrypted cellphone when we see the error in the logs in the same way by passing in the environment and using the `--phone` flag

eg.
```
npm run decrypt -- --env 'prod' --phone
```

| flag | default | description |
| --- | --- | --- |
| --env | "qa" | The environment to get the credentials from |
| --region | "eu-west-1" | The AWS region to use when getting the credentials |
| --passphrase | value retrieved from SSM | Passphrase to use |
| --iv | value retrieved from SSM | Initialisation vector to use |
| --phone | N\A | Flag to specify you are decrypting a cellphone number


