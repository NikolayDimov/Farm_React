import { SignInDto } from "../types/types";
import authHeader from "./authHeader";

const BASE_URL = "http://localhost:3000";

export const loginUser = async (signInDto: SignInDto) => {
    try {
        const authHeaders = authHeader();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            ...(authHeaders.Authorization ? { Authorization: authHeaders.Authorization } : {}),
        };

        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers,
            body: JSON.stringify(signInDto),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Login failed: ${errorMessage}`);
        }

        const userData = await response.json();
        return {
            id: userData.id,
            userEmail: userData.email,
            access_token: userData.access_token,
        };
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

// Similar modifications for registerUser, logoutUser, and checkUser functions

export const registerUser = async (email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
};

export const logoutUser = async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Include any necessary authentication headers here
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
            // Include any necessary authentication headers here
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "User check failed");
    }

    return response.json();
};
