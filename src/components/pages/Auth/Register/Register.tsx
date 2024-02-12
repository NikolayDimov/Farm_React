import useRegister from "./Register.logic";
import { Link } from "react-router-dom";
import InputField from "../AuthForm";
import { Container, ErrorStyles, FormBlock, FormGroup, LeftPanel, Logo, RightPanel, StyledButton, Title } from "../StyledComponents";
import { AuthLink } from "../StyledComponents";

function Register() {
    const { values, formErrors, handleEmailBlur, handlePasswordBlur, handleConfirmPasswordBlur, changeHandler, handleRegister } = useRegister();

    return (
        <>
            <>
                <Container>
                    <LeftPanel>
                        <Logo>MyFarm</Logo>
                        <FormBlock>
                            <Title>
                                <h3>Register</h3>
                            </Title>

                            <form onSubmit={handleRegister} noValidate>
                                <FormGroup>
                                    <InputField label="Email" type="email" id="email" name="email" value={values.email} onChange={changeHandler} onBlur={handleEmailBlur} />
                                    {formErrors.email && <ErrorStyles>{formErrors.email}</ErrorStyles>}
                                </FormGroup>

                                <FormGroup>
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

                                <FormGroup>
                                    <InputField
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={changeHandler}
                                        onBlur={handleConfirmPasswordBlur}
                                    />
                                    {formErrors.confirmPassword && <ErrorStyles>{formErrors.confirmPassword}</ErrorStyles>}
                                </FormGroup>

                                <StyledButton type="submit">
                                    <span>Create Account</span>
                                </StyledButton>
                            </form>

                            <AuthLink>
                                <Link to="/login">Have an account Login here</Link>
                            </AuthLink>
                        </FormBlock>
                    </LeftPanel>
                    <RightPanel />
                </Container>
            </>
        </>
    );
}

export default Register;
