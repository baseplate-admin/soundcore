import axios from 'axios';

import { APIUrl } from '../../Config/App';
import { APIPath } from '../../Config/Api';

export const useAuthLogout = () => {
    const Logout = () => {
        // localStorage.clear(); // <= Causes Bug
        // localStorage.setItem('accessToken', JSON.stringify({}));
        // localStorage.setItem('refreshToken', JSON.stringify({}));
        const accessToken = localStorage.getItem('accessToken');
        
    };

    return [Logout];
};
