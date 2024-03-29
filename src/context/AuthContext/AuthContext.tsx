import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { loginUser, registerUser } from "../../services/apiService";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "./AuthContext.static";

import { useNavigate } from "react-router-dom";
import { AuthContextType } from "./AuthContext.static";
import { User } from "./AuthContext.static";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedIsUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";

        if (storedUser && storedIsUserLoggedIn) {
            const parsedUser: User = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsLoggedIn(true);
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const userData = await loginUser({ email, password });
            handleLogin(userData);
            navigate("/farm");
        } catch (error) {
            console.error("Login error:", error);
            return Promise.reject(error);
        }
    };

    const register = async (email: string, password: string) => {
        try {
            const userData = await registerUser({ email, password });
            // login( email, password )
            handleLogin(userData);
            navigate("/farm");
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const logout = async () => {
        try {
            await handleLogout();
        } catch (error) {
            console.error("Logout error:", error);
            navigate("/login");
        }
    };

    const handleLogin = (userData: User) => {
        const decodedToken: JwtPayload = jwtDecode(userData.access_token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isUserLoggedIn", "true");
        setUser({
            access_token: userData.access_token,
            id: decodedToken.sub,
            email: decodedToken.email,
            role: decodedToken.role,
        });
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isUserLoggedIn");
        navigate("/login");
        setUser(null);
        setIsLoggedIn(false);
    };

    return <AuthContext.Provider value={{ user, login, register, logout, isLoggedIn, setIsAuthenticated }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user } = context;
    const isAuthenticated = !!user && !isTokenExpired(user.access_token);

    return { ...context, isAuthenticated };
}

const isTokenExpired = (token: string | null | undefined): boolean => {
    if (!token) {
        return true;
    }

    try {
        const decodedToken: { exp?: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        return decodedToken.exp === undefined || decodedToken.exp < currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true;
    }
};
