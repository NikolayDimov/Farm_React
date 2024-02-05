import useLogin from "./Login.logic";
import { Link } from "react-router-dom";
import Layout from "../../../common/Layout";
import InputField from "../AuthForm";
import { Container, ErrorStyles, FormBlock, FormGroup, LeftPanel, Logo, RightPanel, StyledButton, Title } from "../StyledComponents";
import { AuthLink } from "../StyledComponents";

function Login() {
    const { values, handleLogin, handleEmailBlur, changeHandler, formErrors, handlePasswordBlur, error } = useLogin();

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
