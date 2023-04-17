import sha256 from 'crypto-js/sha256';
import forge from 'node-forge';
import crypto from 'crypto-js';

export const GenRSAKeypair = () => {
    const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
    const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

    return {
        publicKey: publicKeyPem,
        privateKey: privateKeyPem
    }

}

export const RsaEncrypt = (plainText: string, publicKeyStr: string) => {
    return crypto.AES.encrypt(plainText, publicKeyStr).toString();
}

export const RsaDecrypt = (decryptData: string, privateKeyStr: string) => {
    return crypto.AES.decrypt(decryptData.toString(), privateKeyStr).toString();
}

// For handling text input
export const hashTextInput = (str: string) => {
    return sha256(str).toString();
}

// For handling file input
export const hashFileInput = (e: any) => {

}

// For handling algorithm change
export const hashAlgorithmChange = async (e: any) => {

}