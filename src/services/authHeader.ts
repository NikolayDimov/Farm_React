// authHeader.js

export default function authHeader() {
    const userString = localStorage.getItem("user");

    if (userString) {
        const user = JSON.parse(userString);
        if (user && user.accessToken) {
            return { Authorization: `Bearer ${user.accessToken}` };
        }
    }

    return {};
}
