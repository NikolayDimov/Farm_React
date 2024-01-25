import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRegsterFormError } from './RegisterErrorHadnler'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import loginImage from "../../../public/nivata.jpg"; 
import Layout from '../common/Layout';
import InputField from '../common/InputFieldLoginRegister';
import StyledButton from '../common/StyledButtonComponent';


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
  font-size: 12px; 
  position: relative;
  top: -10px;
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
                  <InputField
                     label="Email"
                     type="email"
                     id="email"
                     name="email"
                    value={values.email}
                    onChange={changeHandler}
                    onBlur={handleEmailBlur}
                  />
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
    
                <StyledButton type="submit"><span>Create Account</span></StyledButton>
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






