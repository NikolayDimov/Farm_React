export interface LoginFormErrors {
    email: string;
    password: string;
}

export interface LoginFormErrorHook {
    formErrors: LoginFormErrors;
    validateEmail: (email: string) => boolean;
    validatePassword: (password: string) => boolean;
}
