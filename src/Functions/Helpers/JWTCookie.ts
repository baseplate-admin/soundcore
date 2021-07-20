import axios from 'axios';
import { APIPath, APIUrl, JWTTokenExpireTime } from '../../Routes';

// Access -> Longer Token
// Refresh -> Shorter Token.
// Refresh -> Expires
// Access -> Stays

export const SetJWTTokenInLocalStorage = async (
    jwtToken: string,
    refreshToken: string
) => {
    const now = new Date();

    localStorage.setItem(
        'accessToken',
        JSON.stringify({
            access: jwtToken,
        })
    );

    localStorage.setItem(
        'refreshToken',
        JSON.stringify({
            refresh: refreshToken,
            expire: now.getTime() + JWTTokenExpireTime,
        })
    );
};

export const GetJWTTokenInLocalStorage = () => {
    const now = new Date();

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        const base = APIUrl;
        const endPoint = APIPath.REFRESH_ENDPOINT;

        const url = `${base}${endPoint}`;

        const config = {
            headers: {
                'Content-Type': `application/json`,
            },
        };
        const refresh = JSON.parse(accessToken).access;
        const data = { refresh: refresh };

        axios
            .post(url, data, config)
            .then((res) => {
                localStorage.setItem(
                    'refreshToken',
                    JSON.stringify({
                        refresh: res.data.access,
                        expire: now.getTime() + JWTTokenExpireTime,
                    })
                );
            })
            .catch((e) => {
                localStorage.removeItem('accessToken');
            });
    }

    return localStorage.getItem('refreshToken');
};
