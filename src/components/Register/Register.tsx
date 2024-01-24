import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRegsterFormError } from './RegisterErrorHadnler'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';
import loginImage from "../../../public/360_F_502186443_Kubg3Wl76uE8BYl1tcAuYYXgGKAaO6r4.jpg"; 

const GlobalStyles = createGlobalStyle`
  body {
    display: block;
    margin: 0; /* Remove default body margin */
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
  width: 95%;
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
  margin-bottom: 5px; /* Add margin bottom to separate labels from inputs */
`;

const LoginLink = styled.div`
  display: flex;
  align-items: center;
`;

const Logintext = styled.span`
  color: black;
  margin-right: 5px; 
`;



const Logo = styled.div`
  font-size: 24px;
  color: black;
  font-weight: bold;
  margin-bottom: 20px;
`;


function Register() {
    const { register } = useAuth();
    // const { errors, validateForm } = useFormValidation();

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });


    const {
        formErrors,
        validateEmail,
        validatePassword,
        validateConfirmPassword
    } = useRegsterFormError();



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
                console.log('Register successful.');
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            console.error('Registration error message:', error.message);
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
                <h3>Register</h3>
              </Title>
             
              <form onSubmit={handleRegister} noValidate>
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
    
                <FormGroup>
                  <LabelForm htmlFor="confirmPassword">Confirm Password</LabelForm>
                  <StyledInput
                    type="password"
                    placeholder="Confirm your password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={changeHandler}
                    onBlur={handleConfirmPasswordBlur}
                  />
                  {formErrors.confirmPassword && <Error>{formErrors.confirmPassword}</Error>}
                </FormGroup>
    
                <div className="d-sm-flex mb-5 align-items-center">
                  <label className="control control--checkbox mb-3 mb-sm-0">
                    <input type="checkbox" defaultChecked={true} />
                    <span className="caption">Remember me</span>
                    <div className="control__indicator" />
                  </label>
                </div>
    
                <StyledButton type="submit">Create Account</StyledButton>
              </form>

              <LoginLink>
            <Logintext>{`You already have an account`}</Logintext>
            <Link to="/login">
              Login here
            </Link>
          </LoginLink>
              
           
            </FormBlock>
          </LeftPanel>
          <RightPanel />
        </Container>
        </>
    );
    
}


export default Register;