import sha256 from 'crypto-js/sha256';


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