import axios from 'axios';
import { APIPath, APIUrl } from '../../Config/Routes';
import { useAppDispatch } from '../Store/Hooks';
import { SetJWTTokenInLocalStorage } from '../../Functions/Helpers/LocalStorage/JWTCookie';
import {
    postLoginFormErrorAndHasErrorMessage,
    postLoginFormSuccess,
} from '../../Store/Slices/LoginSlice';

export const useAuth = () => {
    const Login = async (username: string, password: string) => {
        const dispatch = useAppDispatch();

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

    const Logout = async () => {
        // localStorage.clear(); // <= Causes Bug
        localStorage.setItem('accessToken', JSON.stringify({}));
        localStorage.setItem('refreshToken', JSON.stringify({}));
    };

    return [Login, Logout];
};
