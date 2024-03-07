import { Dispatch, ReactNode, SetStateAction } from "react";

export interface User {
    access_token: string;
    id: string;
    email: string;
    role: string;
}

export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoggedIn: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface SignInDto {
    email: string;
    password: string;
}

export interface ErrorResponseType {
    message: string;
}
