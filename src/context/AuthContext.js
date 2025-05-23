import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setUserToken(token);
        }
      } catch (e) {
        console.error('Error loading token from storage:', e);
      }
    };

    loadToken();
  }, []);

  const login = async (token) => {
    try {
      setUserToken(token);
      await AsyncStorage.setItem('token', token);
    } catch (e) {
      console.error('Error saving token:', e);
    }
  };

  const logout = async () => {
    try {
      setUserToken(null);
      await AsyncStorage.removeItem('token');
    } catch (e) {
      console.error('Error removing token:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
