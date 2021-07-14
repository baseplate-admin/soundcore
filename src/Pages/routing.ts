export const APIUrl: string = 'http://127.0.0.1:8000/api/v1';

// Set Login Token expiery time
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
}

export enum APIPath {
    LOGIN_ENDPOINT = '/login',
    REFRESH_ENDPOINT = '/refresh',
    TOKEN_JAIL_ENDPOINT = '/token/blacklist',
}
