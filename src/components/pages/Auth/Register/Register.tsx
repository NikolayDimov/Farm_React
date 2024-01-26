import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useRegsterFormError } from './RegisterErrorHadnler'
import { Link } from 'react-router-dom';
import Layout from '../../../common/Layout';
import InputField from '../AuthForm';
import { Container, ErrorStyles, FormBlock, FormGroup, LeftPanel, Logo, RightPanel, StyledButton, Title } from '../StyledComponents';
import { AuthLink } from '../StyledComponents';




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
            <Logo>MyFarm</Logo>
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

              <AuthLink>
            <Link to="/">
              Have an account Login here
            </Link>
          </AuthLink>
              
           
            </FormBlock>
          </LeftPanel>
          <RightPanel />
        </Container>
        </Layout>
        </>
    );
    
}


export default Register;






