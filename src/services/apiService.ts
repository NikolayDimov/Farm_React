import { SignInDto, User } from "../context/AuthContext.static";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../context/AuthContext.static";
import { BASE_URL } from "../static/baseUrl";
import { getUser } from "./authHeaders";

const user = getUser();

export const loginUser = async (signInDto: SignInDto): Promise<User> => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(signInDto),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Login failed: ${errorMessage}`);
        }

        const { access_token } = await response.json();
        const decodedToken: JwtPayload = jwtDecode(access_token);

        const userFromToken: User = {
            access_token,
            id: decodedToken.sub,
            email: decodedToken.email,
            role: decodedToken.role,
        };

        localStorage.setItem("user", JSON.stringify(userFromToken));
        return userFromToken;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const registerUser = async (signInDto: SignInDto): Promise<User> => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(signInDto),
        });

        console.log("Registration API response:", response);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
        }

        const { access_token } = await response.json();
        console.log("Received access_token:", access_token);
        const decodedToken: JwtPayload = jwtDecode(access_token);

        const userFromToken: User = {
            access_token,
            id: decodedToken.sub,
            email: decodedToken.email,
            role: decodedToken.role,
        };

        localStorage.setItem("user", JSON.stringify(userFromToken));
        return userFromToken;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};

export const checkUser = async () => {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "User check failed");
    }

    return response.json();
};
