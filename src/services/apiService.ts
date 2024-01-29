import { SignInDto, User } from "../context/AuthContext.static";
import authHeader from "./authHeader";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../context/AuthContext.static";

const BASE_URL = "http://localhost:3000";

export const loginUser = async (signInDto: SignInDto): Promise<User> => {
    try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers,
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
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers,
            credentials: "include",
            body: JSON.stringify(signInDto),
        });

        console.log("Registration API response:", response);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
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
        console.error("Registration error:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
    }

    return response.json();
};

export const checkUser = async () => {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "User check failed");
    }

    return response.json();
};
