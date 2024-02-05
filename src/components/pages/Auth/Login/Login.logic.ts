import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useLoginFormError } from "./LoginErrorHadnler";

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState("");

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const { formErrors, validateEmail, validatePassword } = useLoginFormError();

    const handleEmailBlur = () => {
        validateEmail(values.email);
    };

    const handlePasswordBlur = () => {
        validatePassword(values.password);
    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const isEmailValid = validateEmail(values.email);
            const isPasswordValid = validatePassword(values.password);

            // Ensure the state is updated before checking validation
            setValues((prevValues) => ({ ...prevValues, email: values.email, password: values.password }));

            if (!isEmailValid || !isPasswordValid) {
                console.log(`email: ${values.email}`);
                console.log(`password: ${values.password}`);
            } else {
                await login(values.email, values.password);
                // console.log("Login successful.");
            }
        } catch (error: any) {
            console.error("Login error:", error);
            console.error("login error message:", error.message);

            const errorMessage = "Invalid email or password!";
            console.log("Setting error:", errorMessage);
            setError(errorMessage);
        }
    };

    useEffect(() => {
        console.log("Login component mounted");
        return () => {
            console.log("Login component unmounted");
        };
    }, []);

    return {
        values,
        error,
        formErrors,
        handleLogin,
        changeHandler,
        handleEmailBlur,
        handlePasswordBlur,
    };
};

export default useLogin;
