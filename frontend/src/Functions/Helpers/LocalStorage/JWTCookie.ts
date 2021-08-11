import axios from 'axios';
import { APIPath, APIUrl, JWTTokenExpireTime } from '../../../Config/Routes';

/*
    Helper:
        Token Type:
            • Access -> Longer Token
            • Refresh -> Shorter Token.
        
        Status:
            • Access -> Expires
            • Refresh -> Stays
*/

export const SetJWTTokenInLocalStorage = async (
    access: string,
    refresh: string
) => {
    const now = new Date();

    localStorage.setItem(
        'accessToken',
        JSON.stringify({
            access: access,
            expiry: now.getTime() + JWTTokenExpireTime,
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

    if (accessToken && refreshToken) {
        const item = JSON.parse(accessToken);

        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            
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
                            expiry: now.getTime() + JWTTokenExpireTime,
                        })
                    );
                })
                .catch((e) => {});
        }

        const newAccessToken = localStorage.getItem('accessToken');
        if (newAccessToken) {
            return JSON.parse(newAccessToken).access;
        }
    }
};
