export const getUser = () => {
    const userString = localStorage.getItem("user");

    if (userString) {
        const user = JSON.parse(userString);
        if (user && user.access_token) {
            return JSON.parse(userString);
        }
    }

    return {};
};
