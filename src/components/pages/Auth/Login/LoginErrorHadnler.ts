import { useState } from "react";
import { LoginFormErrors } from "./interfaces";

export function useLoginFormError() {
    const [formErrors, setFormErrors] = useState<LoginFormErrors>({
        email: "",
        password: "",
    });

    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isEmailValid = true;

        if (email === "") {
            setFormErrors((errors) => ({ ...errors, email: "Email is required" }));
            isEmailValid = false;
        } else if (!emailRegex.test(email)) {
            setFormErrors((errors) => ({ ...errors, email: "Provide a valid email address" }));
            isEmailValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, email: "" }));
        }
        return isEmailValid;
    }

    function validatePassword(password: string): boolean {
        let isPasswordValid = true;

        if (password === "") {
            setFormErrors((errors) => ({ ...errors, password: "Password is required" }));
            isPasswordValid = false;
        } else if (password.length < 6 || password.length > 12) {
            setFormErrors((errors) => ({ ...errors, password: "Password must be between 6 and 12 characters long" }));
            isPasswordValid = false;
        } else {
            // Clear the error
            setFormErrors((errors) => ({ ...errors, password: "" }));
        }
        return isPasswordValid;
    }

    return {
        formErrors,
        validateEmail,
        validatePassword,
    };
}
