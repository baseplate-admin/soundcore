import axios from 'axios';

import { APIUrl } from '../../Config/App';
import { APIPath } from '../../Config/Api';

export const useAuthLogout = () => {
    const Logout = async () => {
        // localStorage.clear(); // <= Causes Bug

        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
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
                    localStorage.setItem('accessToken', JSON.stringify({}));
                    localStorage.setItem('refreshToken', JSON.stringify({}));
                })
                .catch((e) => {});
        }
    };

    return [Logout];
};
