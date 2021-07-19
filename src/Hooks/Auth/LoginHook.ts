import axios from 'axios';
import { APIPath, APIUrl } from '../../Routes';
import { useAppDispatch, useAppSelector } from '../Store/Hooks';
import { SetJWTTokenInLocalStorage } from '../../Functions/Helpers/JWTCookie';
import {
    postLoginFormErrorAndHasErrorMessage,
    postLoginFormSuccess,
    selectLoginFormState,
} from '../../Store/Slices/LoginSlice';

export const useAuthLogin = () => {
    const dispatch = useAppDispatch();

    const loginFormState = useAppSelector(selectLoginFormState);

    const Login = async () => {
        const base = APIUrl;
        const endPoint = APIPath.LOGIN_ENDPOINT;

        const url = `${base}${endPoint}`;

        const data = {
            username: loginFormState.username,
            password: loginFormState.password,
        };

        await axios
            .post(url, data)
            .then(async (res) => {
                dispatch(postLoginFormSuccess());

                await SetJWTTokenInLocalStorage(
                    res.data.token,
                    res.data.refresh
                );
            })
            .catch((e) => {
                postLoginFormErrorAndHasErrorMessage(e.message);
            });
    };
    const Logout = () => {
        localStorage.clear();
    };
    return [Login, Logout];
};
