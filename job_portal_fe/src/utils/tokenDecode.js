import CryptoJS from 'crypto-js';

export function decodeJWT(token) {
    const parts = token.split('.');
    const header = JSON.parse(CryptoJS.enc.Base64.parse(parts[0]).toString(CryptoJS.enc.Utf8));
    const payload = JSON.parse(CryptoJS.enc.Base64.parse(parts[1]).toString(CryptoJS.enc.Utf8));


    return { header, payload };
}

