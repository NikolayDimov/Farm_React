export const getUser = () => {
    const userString = localStorage.getItem("user");
    if (userString === null) {
        throw new Error("User not authenticated");
    }
    return JSON.parse(userString);
};
