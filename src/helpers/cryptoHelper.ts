const { promisify } = require('util');
const crypto = require('crypto');
const generateKeyPairAsync = promisify(crypto.generateKeyPairSync);

class CryptoHelper {

    static readonly TYPE:string = 'rsa';
    static readonly LENGTH:number = 2048;
    static readonly exportOptions = {
        format: "pem",
        type: "pkcs1"
    };

    public static async getKeyPair():Promise<{ publicKey: string; privateKey: string; }> {
        const { publicKey, privateKey } = await generateKeyPairAsync(CryptoHelper.TYPE, {
            modulusLength: CryptoHelper.LENGTH,
        });

        return {
            publicKey: publicKey.export(CryptoHelper.exportOptions),
            privateKey: privateKey.export(CryptoHelper.exportOptions)
        }
    }

    public static decryptData(request: any) {
        return crypto.enc.Base64.parse(request).toString(crypto.enc.Utf8);
    }

    public static validateEncyptedData(runnerPublicKey: string, request: string, signature: string): boolean {

        const publicKey = crypto.enc.Utf8.parse(runnerPublicKey);
        return crypto.verify(request, publicKey, 'SHA256withRSA', crypto.enc.Base64.parse(signature));
    }
}

export default CryptoHelper;
