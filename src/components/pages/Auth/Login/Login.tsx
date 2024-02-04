import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useLoginFormError } from "./LoginErrorHadnler";
import { Link } from "react-router-dom";
import Layout from "../../../common/Layout";
import InputField from "../AuthForm";
import { Container, ErrorStyles, FormBlock, FormGroup, LeftPanel, Logo, RightPanel, StyledButton, Title } from "../StyledComponents";
import { AuthLink } from "../StyledComponents";

function Login() {
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

    return (
        <>
            <Layout>
                <Container>
                    <LeftPanel>
                        <Logo>MyFarm</Logo>
                        <FormBlock>
                            <Title>
                                <h3>Login</h3>
                            </Title>

                            <form onSubmit={handleLogin} noValidate>
                                <FormGroup>
                                    {/* <LabelForm htmlFor="email">Email</LabelForm> */}
                                    <InputField label="Email" type="email" id="email" name="email" value={values.email} onChange={changeHandler} onBlur={handleEmailBlur} />
                                    {formErrors.email && <ErrorStyles>{formErrors.email}</ErrorStyles>}
                                </FormGroup>

                                <FormGroup>
                                    {/* <LabelForm htmlFor="password">Password</LabelForm> */}
                                    <InputField
                                        label="Password"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={values.password}
                                        onChange={changeHandler}
                                        onBlur={handlePasswordBlur}
                                    />
                                    {formErrors.password && <ErrorStyles>{formErrors.password}</ErrorStyles>}
                                </FormGroup>

                                {error && <ErrorStyles>{error}</ErrorStyles>}

                                <StyledButton type="submit">
                                    <span>Log In</span>
                                </StyledButton>
                            </form>

                            <AuthLink>
                                <Link to="/register">Create an account instead</Link>
                            </AuthLink>
                        </FormBlock>
                    </LeftPanel>
                    <RightPanel />
                </Container>
            </Layout>
        </>
    );
}

export default Login;
