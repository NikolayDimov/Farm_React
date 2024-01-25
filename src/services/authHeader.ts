export default function authHeader() {
    const userString = localStorage.getItem("user");

    if (userString) {
        const user = JSON.parse(userString);
        if (user && user.access_token) {
            return { Authorization: `Bearer ${user.access_token}` };
        }
    }

    return {};
}
