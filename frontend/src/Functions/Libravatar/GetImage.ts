import md5 from 'blueimp-md5';

export const GetImageFromLibravatarByEmail = (email: string) => {
    const baseUrl = 'https://seccdn.libravatar.org';
    const hash = md5(email);
    return `${baseUrl}/avatar/${hash}`;
};
