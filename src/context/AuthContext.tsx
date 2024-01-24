
import { createContext, useContext, useEffect, useState } from 'react';

import { loginUser, registerUser, logoutUser, checkUser } from '../services/ apiService';


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
  
      setUser({
        id: userData.id, // replace with the actual property name from your API response
        username: userData.userEmail, // replace with the actual property name from your API response
        access_token: userData.access_token,
        // other properties from userData
      });
  
      setIsLoggedIn(true);
      nav('/profile');
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(error);
    }
  };
  

      const register = async (email: string, password: string) => {
        try {
          const userData = await registerUser(email, password); // Your API function to register
          setUser(userData);
          setIsLoggedIn(true);
          nav('/profile');
        } catch (error) {
          console.error('Registration error:', error);
        }
      };

      const logout = async () => {
        try {
          await logoutUser(); // Your API function to logout
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
    
        checkLoggedInUser();
      }, [nav]);


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

