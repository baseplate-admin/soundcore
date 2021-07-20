import axios from 'axios';
import { APIPath, APIUrl, JWTTokenExpireTime } from '../../Routes';

export const SetJWTTokenInLocalStorage = async (
    jwtToken: string,
    refreshToken: string
) => {
    const now = new Date();

    const firstRefreshToken = localStorage.getItem('refreshToken');
    const secondRefreshToken = localStorage.getItem('secondRefreshToken');

    console.log(firstRefreshToken);
    const base = APIUrl;
    const endPoint = APIPath.TOKEN_JAIL_ENDPOINT;

    const url = `${base}${endPoint}`;

    const config = {
        headers: {
            'Content-Type': `application/json`,
        },
    };

    await axios.put(url, secondRefreshToken, config);

    localStorage.removeItem('secondRefreshToken');

    localStorage.setItem(
        'accessToken',
        JSON.stringify({
            jwt: jwtToken,
        })
    );

    localStorage.setItem(
        'refreshToken',
        JSON.stringify({
            refresh: refreshToken,
            expire: now.getTime() + JWTTokenExpireTime,
        })
    );

    localStorage.setItem(
        'secondRefreshToken',
        JSON.stringify({
            refresh: jwtToken,
        })
    );
};

export const GetJWTTokenInLocalStorage = async () => {
    const now = new Date();

    const firstJWTTokenValue = localStorage.getItem('jwtToken');
    const secondJWTTokenValue = localStorage.getItem('secondJwtToken');

    if (firstJWTTokenValue === '') {
        const base = APIUrl;
        const endPoint = APIPath.TOKEN_JAIL_ENDPOINT;

        const url = `${base}${endPoint}`;

        await axios.post(url, secondJWTTokenValue);

        localStorage.removeItem('secondJwtToken');
    }

    const refreshToken = localStorage.getItem('refreshToken');
    const base = APIUrl;
    const endPoint = APIPath.REFRESH_ENDPOINT;

    const url = `${base}${endPoint}`;

    await axios
        .post(url, refreshToken)
        .then((res) =>
            localStorage.setItem(
                'jwtToken',
                JSON.stringify({
                    jwt: res.data.token,
                    expire: now.getTime() + JWTTokenExpireTime,
                })
            )
        )
        .catch((e) => {
            console.error(
                `
                Error in JWTCookie GetJWTTokenInLocalStorage function.
                    Reason:${e}
                `
            );
        });
    return localStorage.getItem('jwtToken');
};
