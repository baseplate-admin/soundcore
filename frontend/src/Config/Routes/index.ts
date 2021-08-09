export const APIUrl: string = 'http://127.0.0.1:8000/api/v1';
export const ApplicationName: string = 'SoundCore';
export const MediaUrl: string = 'http://127.0.0.1:8000';

// Set Login Token expiery time : (in-miliseconds)
export const JWTTokenExpireTime: number = 50000;

export enum RoutingPath {
    // Main Page
    HOME_PAGE = '/',
    LIBRARY_PAGE = '/library/',
    CREATE_LIBRARY_PAGE = '/library/genarator/',

    // Accounts related stuff
    LOGIN_PAGE = '/accounts/login/',
    REGISTER_PAGE = '/accounts/register/',
    FORGET_PASSWORD_PAGE = '/accounts/forget/',

    // Upload File
    UPLOAD_SONG_PAGE = '/upload/song/',
}

export enum APIPath {
    LOGIN_ENDPOINT = '/users/token/',
    REFRESH_ENDPOINT = '/users/token/refresh/',
    TOKEN_JAIL_ENDPOINT = '/users/token/blacklist/',

    FETCH_SONG_ENDPOINT = '/music/',
    RANDOM_SONG_ENDPOINT = '/music/random',

    UPLOAD_MUSIC_PATH = '/music/',

    USER_INFO_ENDPOINT = '/users/info/',
}
