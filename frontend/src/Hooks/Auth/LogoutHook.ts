export const useAuthLogout = () => {
    const Logout = () => {
        // localStorage.clear(); // <= Causes Bug
        localStorage.setItem('accessToken', JSON.stringify({}));

        localStorage.setItem('refreshToken', JSON.stringify({}));
    };

    return [Logout];
};
