import { ReactNode } from "react";

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
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface LoginFormErrors {
    email: string;
    password: string;
}

export interface LoginFormErrorHook {
    formErrors: LoginFormErrors;
    validateEmail: (email: string) => boolean;
    validatePassword: (password: string) => boolean;
}

export interface RegisterFormErrors {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterFormErrorHook {
    formErrors: RegisterFormErrors;
    validateEmail: (email: string) => boolean;
    validatePassword: (password: string) => boolean;
    validateConfirmPassword: (confirmPassword: string, password: string) => boolean;
}

export interface SignInDto {
    email: string;
    password: string;
}

export interface ErrorResponseType {
    message: string;
}
