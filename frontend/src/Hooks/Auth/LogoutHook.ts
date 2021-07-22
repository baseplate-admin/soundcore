export const useAuthLogout = () => {
    const Logout = () => {
        localStorage.clear();
    };

    return [Logout];
};
