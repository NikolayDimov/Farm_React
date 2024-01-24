import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLoginFormError } from "./LoginErrorHadnler";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';
import loginImage from "../../../public/360_F_502186443_Kubg3Wl76uE8BYl1tcAuYYXgGKAaO6r4.jpg"; 

const GlobalStyles = createGlobalStyle`
  body {
    display: block;
    margin: 0;
  }
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const LeftPanel = styled.div`
  flex: 1.5;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  padding: 20px;
`;

const RightPanel = styled.div`
  flex: 2;
  background-image: url(${loginImage});
  background-size: cover;
  background-position: center;
`;

const FormBlock = styled.div`
    max-width: 600px;
    width: 70%;
    margin: 100px auto 0 auto;  
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: black;
  font-family: Noto Sans;
  font-size: 1.5em;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  &:first-child {
    margin-bottom: 30px;
  }
`;

const Error = styled.p`
  color: red;
  margin-top: 8px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background-color: white;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #ddd;
  border: none;
  cursor: pointer;
`;

const LabelForm = styled.label`
  color: black;
  margin-bottom: 5px; 
`;

const RegisterLink = styled.div`
  display: flex;
  align-items: center;
`;

const Registertext = styled.span`
  color: black;
  margin-right: 5px; 
`;

const Logo = styled.div`
  font-size: 24px;
  color: black;
  font-weight: bold;
  margin-bottom: 20px;
`;

function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const {
    formErrors,
    validateEmail,
    validatePassword,
  } = useLoginFormError();

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

      if (!isEmailValid || !isPasswordValid) {
        console.log(`email: ${values.email}`);
        console.log(`password: ${values.password}`);
      } else {
        await login(values.email, values.password);
        console.log("Login successful.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      console.error("login error message:", error.message);

      const errorMessage = "Invalid email or password!";
      console.log("Setting error:", errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <>
    <GlobalStyles />
    <Container>
      <LeftPanel>
      <Logo>Farm BG</Logo>
        <FormBlock>
          <Title>
            <h3>Login</h3>
          </Title>
         
          <form onSubmit={handleLogin} noValidate>
            <FormGroup>
              <LabelForm htmlFor="email">Email</LabelForm>
              <StyledInput
                type="email"
                placeholder="Enter your email"
                id="email"
                name="email"
                value={values.email}
                onChange={changeHandler}
                onBlur={handleEmailBlur}
              />
              {formErrors.email && <Error>{formErrors.email}</Error>}
            </FormGroup>

            <FormGroup>
              <LabelForm htmlFor="password">Password</LabelForm>
              <StyledInput
                type="password"
                placeholder="Enter your password"
                id="password"
                name="password"
                value={values.password}
                onChange={changeHandler}
                onBlur={handlePasswordBlur}
              />
              {formErrors.password && <Error>{formErrors.password}</Error>}
            </FormGroup>

            {error && <Error>{error}</Error>}

            <StyledButton type="submit">Log In</StyledButton>
          </form>
          
          <RegisterLink>
            <Registertext>{`You don't have an account`}</Registertext>
            <Link to="/register">
              Register here
            </Link>
          </RegisterLink>

        </FormBlock>
      </LeftPanel>
      <RightPanel />
    </Container>
    </>
  );
}

export default Login;
