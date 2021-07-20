import axios from 'axios';
import { APIPath, APIUrl, JWTTokenExpireTime } from '../../Routes';

// Access -> Longer Token
// Refresh -> Shorter Token.
// Refresh -> Stays
// Access -> Expires

export const SetJWTTokenInLocalStorage = async (
    access: string,
    refresh: string
) => {
    const now = new Date();

    localStorage.setItem(
        'accessToken',
        JSON.stringify({
            access: access,
            expire: now.getTime() + JWTTokenExpireTime,
        })
    );

    localStorage.setItem(
        'refreshToken',
        JSON.stringify({
            refresh: refresh,
        })
    );
};

export const GetJWTTokenInLocalStorage = () => {
    const now = new Date();

    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === '' && refreshToken) {
        const base = APIUrl;
        const endPoint = APIPath.REFRESH_ENDPOINT;

        const url = `${base}${endPoint}`;

        const config = {
            headers: {
                'Content-Type': `application/json`,
            },
        };
        const refresh = JSON.parse(refreshToken).refresh;
        const data = { refresh: refresh };

        axios
            .post(url, data, config)
            .then((res) => {
                localStorage.setItem(
                    'accessToken',
                    JSON.stringify({
                        access: res.data.access,
                        expire: now.getTime() + JWTTokenExpireTime,
                    })
                );
            })
            .catch((e) => {});
    }
    const newAccessToken = localStorage.getItem('accessToken');
    if (newAccessToken) {
        return JSON.parse(newAccessToken).access;
    }
};
