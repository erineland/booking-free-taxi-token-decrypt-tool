import crypto from 'crypto';

export default class Crypto {
    static encrypt(body, secret) {
        return crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('hex');
    }

    static cipher(body, secret) {
        const cipher = crypto.createCipher('aes192', secret);
        let encrypted = cipher.update(body, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    static decipher(body, secret) {
        const decipher = crypto.createDecipher('aes192', secret);
        let decrypted = decipher.update(body, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
