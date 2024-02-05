import React from "react";
import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRegsterFormError } from "./RegisterErrorHadnler";

const useRegister = () => {
    const { register } = useAuth();
    // const { errors, validateForm } = useFormValidation();

    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { formErrors, validateEmail, validatePassword, validateConfirmPassword } = useRegsterFormError();

    const handleEmailBlur = () => {
        validateEmail(values.email);
    };

    const handlePasswordBlur = () => {
        validatePassword(values.password);
    };

    const handleConfirmPasswordBlur = () => {
        validateConfirmPassword(values.confirmPassword, values.password);
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            let isEmailValid = validateEmail(values.email);
            let isPasswordValid = validatePassword(values.password);
            let isConfirmPasswordValid = validateConfirmPassword(values.confirmPassword, values.password);

            if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
                console.log(`email: ${values.email}`);
                console.log(`password: ${values.password}`);
                console.log(`confirmPass: ${values.confirmPassword}`);
            } else {
                await register(values.email, values.password);
                console.log("Register successful.");
            }
        } catch (error: any) {
            console.error("Registration error:", error);
            console.error("Registration error message:", error.message);
        }
    };

    return {
        values,
        formErrors,
        handleEmailBlur,
        handlePasswordBlur,
        handleConfirmPasswordBlur,
        changeHandler,
        handleRegister,
    };
};

export default useRegister;
