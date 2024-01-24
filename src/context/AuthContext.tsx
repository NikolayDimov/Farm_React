
import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser, logoutUser, checkUser } from '../services/ apiService';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/types";

import { useNavigate } from "react-router-dom";
import { AuthContextType } from '../types/types'; 
import { User } from '../types/types'; 
import { AuthProviderProps } from '../types/types'; 




const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const nav = useNavigate();


  const login = async (email: string, password: string) => {
    try {
      const userData = await loginUser({ email, password });
      //console.log('User data:', userData);
      localStorage.setItem('user', JSON.stringify(userData));
      //console.log('User data saved to localStorage');
      const decodedToken: JwtPayload = jwtDecode(userData.access_token);
      //console.log('Decoded Token:', decodedToken);

      const userFromToken: User = {
        access_token: userData.access_token,
        id: decodedToken.sub,
        email: decodedToken.email,
        role: decodedToken.role,
      };
      
      setUser(userFromToken);
      setIsLoggedIn(true);
      nav('/profile');
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(error);
    }
  };





  const register = async (email: string, password: string) => {
    try {
      const userData = await registerUser({email, password});
      console.log('User data after registration:', userData);
  
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('localstorage:', localStorage);

  
      const decodedToken: JwtPayload = jwtDecode(userData.access_token);
  
      const userFromToken: User = {
        access_token: userData.access_token,
        id: decodedToken.sub,
        email: decodedToken.email,
        role: decodedToken.role,
      };
  
      setUser(userFromToken);
      setIsLoggedIn(true);
      console.log('Navigating to /profile');
      nav('/profile');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  

  





      const logout = async () => {
        try {
          await logoutUser();
          setUser(null);
          setIsLoggedIn(false);
          nav('/');
        } catch (error) {
          console.error('Logout error:', error);
          nav('/login');
        }
      };

      useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const userData = await checkUser();
                setUser(userData);
                setIsLoggedIn(true);
            } catch (error) {
                setUser(null);
                setIsLoggedIn(false);
            }
        };
    
        if (!isLoggedIn) {
            checkLoggedInUser();
        }
    }, []);
    

  const values: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoggedIn,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}





export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  }

