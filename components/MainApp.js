import React, { useEffect, useState } from 'react';
import { useStyle } from '../AppStyle';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './Home';
import Login from './Login';

export default function MainApp({reset}) {

  const { appStyles, toWhite } = useStyle();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let [userToken, setUserToken] = useState('');

  useEffect(() => {
    async function checkAuthentication() {
      try {
        userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          setUserToken(userToken);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    checkAuthentication();
    toWhite();
  }, []); 

  const handleLogin = (email) => {
    setUserToken(email);
    AsyncStorage.setItem('userToken', email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };
 
  return (
    <View style={[appStyles.container, appStyles.background, appStyles.top]}>
        {isAuthenticated ? (
          <Home onLogout={handleLogout} userToken={userToken} reset={reset}/>
        ) : (
          <Login onLogin={handleLogin} reset={reset}/>
        )}
    </View>
  );
}