// src/contexts/AuthContext.jsx
import  { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import * as mockAuth from '../services/mockAuth';
import { AuthContext } from './Context';


export const AuthProvider = ({ children }) => {
  const { 
    loginWithRedirect, 
    logout: auth0Logout, 
    user: auth0User, 
    isAuthenticated: isAuth0Authenticated,
    getAccessTokenSilently 
  } = useAuth0();
  
  const [user, setUser] = useState(null);
  const [isCustomAuthenticated, setIsCustomAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  
  useEffect(() => {
    const checkSession = () => {
      const isAuth = mockAuth.isAuthenticated();
      const currentUser = mockAuth.getCurrentUser();
      const currentToken = mockAuth.getToken();
      
      setIsCustomAuthenticated(isAuth);
      setUser(currentUser);
      setToken(currentToken);
      setLoading(false);
    };
    
    checkSession();
  }, []);

  const loginWithCustomForm = async (email, password) => {
    setLoading(true);
    try {
      const result = await mockAuth.login(email, password);
      setUser(result.user);
      setToken(result.token);
      setIsCustomAuthenticated(true);
      return { success: true, user: result.user, token: result.token };
    } catch (error) {
      return { success: false, error: error.error };
    } finally {
      setLoading(false);
    }
  };

  const registerWithCustomForm = async (email, password, name) => {
    setLoading(true);
    try {
      const result = await mockAuth.register(email, password, name);
      setUser(result.user);
      setToken(result.token);
      setIsCustomAuthenticated(true);
      return { success: true, user: result.user, token: result.token, message: result.message };
    } catch (error) {
      return { success: false, error: error.error };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    mockAuth.logout();
    setUser(null);
    setToken(null);
    setIsCustomAuthenticated(false);
    
    if (isAuth0Authenticated) {
      auth0Logout({ returnTo: window.location.origin });
    }
  };

  const isAuthenticated = isAuth0Authenticated || isCustomAuthenticated;
  const currentUser = auth0User || user;


  const makeAuthenticatedRequest = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (isAuth0Authenticated) {
      const auth0Token = await getAccessTokenSilently();
      headers['Authorization'] = `Bearer ${auth0Token}`;
    }
    
    return fetch(url, {
      ...options,
      headers
    });
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user: currentUser,
      token,
      loading,
      loginWithCustomForm,
      registerWithCustomForm,
      loginWithRedirect,
      logout,
      makeAuthenticatedRequest
    }}>
      {children}
    </AuthContext.Provider>
  );
};