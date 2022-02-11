import React, {createContext, useState} from 'react';
import {login, register} from './UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

const UserProvider = ({children}) => {
  const onLogin = async (email, password) => {
    try {
      const res = await login(email, password);
      if (res.error === false) {
        const token = res.data.token;
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('isLogin', JSON.stringify(true));
        return true;
      }
    } catch (e) {
      console.log('onLogin error', e);
    }
    await AsyncStorage.removeItem('token');
    return false;
  };
  const onRegister = async (email, password) => {
    try {
      const res = await register(email, password);
      if (res.error === false) {
        return true;
      }
    } catch (e) {
      console.log('onRgister error', e);
    }
    return false;
  };
  return (
    <UserContext.Provider value={{onLogin, onRegister}}>
      {children}
    </UserContext.Provider>
  );
};
export {UserContext, UserProvider};
