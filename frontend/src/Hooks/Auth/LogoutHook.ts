import { blacklistToken } from '../../Functions/Helpers/JWT/Blacklist';
import { useHistory } from 'react-router';

export const useAuthLogout = () => {
    const history = useHistory();

    const Logout = async () => {
        // localStorage.clear(); // <= Causes Bug

        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken && accessToken) {
            const refresh = JSON.parse(refreshToken).refresh;
            blacklistToken(refresh);
            history.go(0); // Refresh the page ? (Update Needed)

            localStorage.setItem('accessToken', JSON.stringify({}));
            localStorage.setItem('refreshToken', JSON.stringify({}));
        }
    };

    return [Logout];
};
