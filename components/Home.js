import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, Button, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer, navigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

import { useUser } from '../UserContext';
import { useStyle } from '../AppStyle';

import HomeScreen from './HomeScreen';
import CallScreen from './CallScreen';
import HistoryScreen from './HistoryScreen';
import AccountScreen from './AccountScreen';
import CallingScreen from './CallingScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();  
// const Drawer = createDrawerNavigator();

export default function Home({ onLogout, userToken, reset}){
  const { appStyles, toHomeColor } = useStyle();
  const { findUserByEmail } = useUser();
  const users = findUserByEmail(userToken);
  const [user, setUser] = useState('');

  useEffect(() => {
    toHomeColor();
  }, []);

  function CallHome({navigation}) {
    return(
      <HomeScreen userToken={users} store={store} navigation={navigation}/>
    )
  }

  function CallHistory({navigation}) {
    return(
      <HistoryScreen userToken={users} store={store} navigation={navigation} />
    )
  }

  function CallAccount({navigation}) {
    return(
      <AccountScreen userToken={users} onLogout={onLogout} navigation={navigation}/>
    )
  }

  function MainScreen() {
    return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                let imageSource;
                let imageSize = 30;
                const imageOpacity = focused ? 1 : 0.5;
                if (route.name === 'Home') {
                  imageSource = require('../assets/home.png');
                } else if (route.name === 'Call') {
                  imageSource = require('../assets/call.png');
                } else if (route.name === 'History') {
                  imageSource = require('../assets/history.png');
                } else if (route.name === 'Account') {
                  imageSource = require('../assets/Profile.png');
                }
                return (
                  <View style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      overflow: 'hidden',
                      borderTopLeftRadius: 25,
                      borderTopRightRadius: 25,
                    }}>
                    <Image
                      source={imageSource}
                      style={{ width: imageSize, height: imageSize, opacity: imageOpacity }}
                    />
                    {focused && (<Text style={{fontSize: 7,}}>{route.name}</Text>)}
                    {focused && (<View style={{
                        zIndex: -1,
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        height: '90%',
                        backgroundColor: '#5264BE',
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                      }}></View>)}
                  </View>
                );  
              },
              tabBarHideOnKeyboard: true,
              activeTintColor: 'blue',
              inactiveTintColor: 'gray',
              tabBarStyle:{ 
                position: 'absolute', 
                margin: 15,
                marginBottom: Platform.OS=='ios' ? 20 : 15,
                borderRadius: 30,
                paddingBottom: Platform.OS==='ios' ? -20 : 5,
                height: Platform.OS==='ios' ? 85 : 75,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: '#8EDFEB',
              },
              tabBarShowLabel: false,
          })}
        >
        <Tab.Screen name='Home' component={CallHome} options={{headerShown: false, tabBarLabel: '' }}/>
        <Tab.Screen name='Call' component={CallScreen} options={{headerShown: false, tabBarLabel: '' }}/>
        <Tab.Screen name='History' component={CallHistory} options={{headerShown: false, tabBarLabel: '' }}/>
        <Tab.Screen name='Account' component={CallAccount} options={{headerShown: false, tabBarLabel: '' }}/>
      </Tab.Navigator>
    );
  }

  function store ( userItem ) {
    setUser(userItem);
  }

  function MainNavigator() {
    return(
      <Stack.Navigator>
        <Stack.Screen name='MainScreen' component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name='MakeCall' component={CallingScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Settings' component={SettingsScreen} options={{headerShown: false}}/>
        <Stack.Screen name='About' component={MainScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    )
  } 

  return(
    <NavigationContainer>
      {<MainNavigator />}
      <StatusBar style={'dark'} />
    </NavigationContainer>
  )
}