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
