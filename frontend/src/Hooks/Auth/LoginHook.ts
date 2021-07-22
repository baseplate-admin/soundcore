import axios from 'axios';
import { APIPath, APIUrl } from '../../Routes';
import { useAppDispatch } from '../Store/Hooks';
import { SetJWTTokenInLocalStorage } from '../../Functions/Helpers/JWTCookie';
import {
    postLoginFormErrorAndHasErrorMessage,
    postLoginFormSuccess,
} from '../../Store/Slices/LoginSlice';

export const useAuthLogin = () => {
    const dispatch = useAppDispatch();

    const Login = async (username: string, password: string) => {
        const base = APIUrl;
        const endPoint = APIPath.LOGIN_ENDPOINT;

        const url = `${base}${endPoint}`;

        const data = {
            username: username,
            password: password,
        };

        await axios
            .post(url, data)
            .then(async (res) => {
                dispatch(postLoginFormSuccess());
                console.log(res);
                await SetJWTTokenInLocalStorage(
                    res.data.access,
                    res.data.refresh
                );
            })
            .catch((e) => {
                postLoginFormErrorAndHasErrorMessage(e.message);
            });
    };

    return [Login];
};
