import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRegsterFormError } from './RegisterErrorHadnler'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import loginImage from "../../../public/360_F_502186443_Kubg3Wl76uE8BYl1tcAuYYXgGKAaO6r4.jpg"; 
import Layout from '../common/Layout';
import { ErrorResponseType } from '../../types/types';

const BASE_URL = "http://localhost:3000";

const Error = styled.p`
  color: red;
  margin-top: 8px;
` as React.FC;

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

const ErrorStyles = styled.p`
  color: red;
  margin-top: 8px;
`;

const StyledInput = styled.input`
  width: 95%;
  padding: 10px;
  margin-top: 5px;
  background-color: white;
  border-radius: 5px;
  color: black;
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

    // const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     try {
    //         let isEmailValid = validateEmail(values.email);
    //         let isPasswordValid = validatePassword(values.password);
    //         let isConfirmPasswordValid = validateConfirmPassword(values.confirmPassword, values.password);

    //         if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
    //             console.log(`email: ${values.email}`);
    //             console.log(`password: ${values.password}`);
    //             console.log(`confirmPass: ${values.confirmPassword}`);
    //         } else {
    //             await register(values.email, values.password);
    //             console.log('Register successful.');
    //         }
    //     } catch (error: any) {
    //         console.error('Registration error:', error);
    //         console.error('Registration error message:', error.message);
    //     }
    // };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        const isEmailValid = validateEmail(values.email);
        const isPasswordValid = validatePassword(values.password);
        const isConfirmPasswordValid = validateConfirmPassword(
          values.confirmPassword,
          values.password
        );
    
        if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
          console.log(`email: ${values.email}`);
          console.log(`password: ${values.password}`);
          console.log(`confirmPass: ${values.confirmPassword}`);
        } else {
          const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          });

          console.log('response', response)
    
          if (!response.ok) {
            const errorData: ErrorResponseType = await response.json();
            throw { error: errorData.message || "Registration failed" };
        }
        
    
          // Registration successful, you can handle it accordingly
          console.log("Registration successful.");
        }
      } catch (error: any) {
        console.error("Registration error:", error);
        console.error("Registration error message:", error.message);
      }

      console.error("email", values.email);
      console.error("pass", values.password);
    };
    


    return (
        <>
        <Layout>
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
                  {formErrors.email && <ErrorStyles>{formErrors.email}</ErrorStyles>}
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
                  {formErrors.password && <ErrorStyles>{formErrors.password}</ErrorStyles>}
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
                  {formErrors.confirmPassword && <ErrorStyles>{formErrors.confirmPassword}</ErrorStyles>}
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
        </Layout>
        </>
    );
    
}


export default Register;