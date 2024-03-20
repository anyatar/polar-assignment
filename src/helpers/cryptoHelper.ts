import { generateKeyPair } from "crypto";
const crypto = require('crypto');

class CryptoHelper {

    static readonly TYPE = "rsa";
    static readonly LENGTH: number = 2048;
    
    public static async getKeyPair(): Promise<{ publicKey: string; privateKey: string; }> {

        return new Promise((resolve, reject) => {
            generateKeyPair(CryptoHelper.TYPE, {
                modulusLength: CryptoHelper.LENGTH,
                publicKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem'
                }
            }, (err, publicKey, privateKey) => {
                if (err) return reject(err);
                resolve({ publicKey, privateKey });
            });
        });
    }

    public static decryptData(request: any) {
        //return crypto.enc.Base64.parse(request).toString(crypto.enc.Utf8);
        return Buffer.from(request, 'base64');
    }

    public static validateEncyptedData(publicKey: string, request: string, signature: string): boolean {

        //const publicKey = crypto.enc.Utf8.parse(runnerPublicKey);
        const verify = crypto.createVerify('RSA-SHA256');
        verify.update(request);
        return verify.verify(publicKey, signature, 'base64');
        //return crypto.verify(request, publicKey, 'SHA256withRSA', Buffer.from(signature, 'base64'));
    }
}

export default CryptoHelper;
