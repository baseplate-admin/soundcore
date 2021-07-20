import CryptoJS from 'crypto-js';

export const GetImageFromLibravatarByEmail = (email: string) => {
    const baseUrl = 'https://seccdn.libravatar.org';
    const hash = CryptoJS.MD5(email);
    return `${baseUrl}/avatar/${hash}`;
};
