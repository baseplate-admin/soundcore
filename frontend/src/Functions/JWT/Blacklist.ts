import axios from 'axios';
import { APIUrl } from '../../Config/App';

import { APIPath } from '../../Config/Api';

export const blacklistToken = async (token: string) => {
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
        })
        .catch((e) => {
            console.error(`Token Can't be blacklisted | Reason : ${e}`);
        });
};
