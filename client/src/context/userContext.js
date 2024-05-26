import { createContext, useContext, useState, useEffect } from "react";
import { currentUser, loginUser, logoutUser, registerUser } from "../services/auth.api";
import { deleteTokenFromLocalStorage, saveTokenToLocalStorage } from "../utility/userUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  

    const login = async (credentials) => {
        setIsLoading(true);
        try {
          setIsLoading(true);
          const data = await loginUser(credentials)
          if (data.error) {
            throw new Error(data.message);
          }
          setIsLoggedIn(true);
          setUser(data.data.user.user);
          saveTokenToLocalStorage(data.data.user.token);
        } catch (err) {
          throw new Error(err.message)
        } finally {
          setIsLoading(false);
        }
    }

    const logout = async () => {
        try {
          setIsLoading(true);
          const data = await logoutUser()
          if (data.error) {
            throw new Error(data.message);
          }
          setIsLoggedIn(false);
          setUser(null);
          setError(null);
          deleteTokenFromLocalStorage('accessToken');
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
    }

    const getCurrentUser = async () => {
      try {
        setIsLoading(true)
        const user = await currentUser();
        if (!user) {
          setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
        setUser(user.data.user);
        setError(null);
        setIsLoading(false)
      } catch(err) {
        setIsLoading(false)
        setIsLoggedIn(false);
      }
    }

    const register = async (credentials) => {
      try {
        setIsLoading(true);
        const data = await registerUser(credentials);
        if (data.error) {
          throw new Error(data.message);
        }
        setIsLoading(false);
      } catch(err) {
        throw new Error(err.message)
      } 
    }

    useEffect(() => {
      getCurrentUser();
  }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, isLoading, error, login, logout, register, setError }}>
          {children}
        </AuthContext.Provider>
    );
}

export function useAuth () {
    return useContext(AuthContext);
}