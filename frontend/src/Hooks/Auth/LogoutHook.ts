import { useHistory } from 'react-router';
import axios from 'axios';
import { APIUrl } from '../../Config/App';

import { APIPath } from '../../Config/Api';

export const useAuthLogout = () => {
    const history = useHistory();

    const Logout = async () => {
        // localStorage.clear(); // <= Causes Bug

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken && accessToken) {
            const refresh = JSON.parse(refreshToken).refresh;
            blacklistToken(refresh);

            localStorage.setItem('accessToken', JSON.stringify({}));
            localStorage.setItem('refreshToken', JSON.stringify({}));
        }
    };

    const blacklistToken = async (token: string) => {
        const url = `${APIUrl}${APIPath.TOKEN_JAIL_ENDPOINT}`;

        const config = {
            headers: {
                'Content-Type': `application/json`,
            },
        };

        const data = { refresh: token };

        await axios
            .post(url, data, config)
            .then(async () => {
                console.log('Token Blacklisted');
                history?.go(0);
            })
            .catch((e) => {
                console.error(`Token Can't be blacklisted | Reason : ${e}`);
            });
    };

    return [Logout];
};
