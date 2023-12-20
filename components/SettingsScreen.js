import React, { useEffect } from 'react';
import { View, Text, Button, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Linking, Platform } from 'react-native';
import { StoreReview } from 'react-native';
import InAppReview from 'react-native-in-app-review';
import { useUser } from '../UserContext';
import { useStyle } from '../AppStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';

const Stack = createStackNavigator();

const SettingsScreen = ({ userToken, onLogout, navigation }) => {
  console.log(',,,')
  const { appStyles, toggleBG, toggleColor, toBlue, toWhite } = useStyle();
  const isFocused = useIsFocused();

  const { findUserByEmail } = useUser();
  const userData = findUserByEmail(userToken);

  useEffect(() => {
    if (isFocused) {
      toBlue();
    }
  }, [isFocused]);

  function Links({ navigation }) {
    return (
      <View style={[appStyles.container]}>
        <View style={styles.header}>
          <View style={styles.img_container}>
            <Image source={require('../assets/Profile.png')} style={styles.img} />
          </View>
          <Text style={styles.name}>{userData.Name}</Text>
        </View>
        <ScrollView style={styles.body}>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Account')}><Text style={{ fontSize: 18, }}>Account</Text></TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Privacy')}><Text style={{ fontSize: 18, }}>Privacy</Text></TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Notification')}><Text style={{ fontSize: 18, }}>Notification</Text></TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.item} onPress={() => Rate5Star}><Text style={{ fontSize: 18, }}>Rate 5 Star 🌟</Text></TouchableOpacity>
          <View style={styles.line}></View>
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('TermsNConditions')}><Text style={{ fontSize: 18, }}>Terms & Conditions</Text></TouchableOpacity>
          <TouchableOpacity onPress={onLogout} style={{padding: 15, backgroundColor: 'lightblue', borderRadius: 50, alignSelf: 'center', margin: 10,}}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.footer}>
          <Text style={{ fontSize: 15, }}>Made by ❤️ in <Text style={{ fontSize: 17, color: 'green', }}>Pakistan</Text></Text>
        </View>
      </View>
    );
  };

  function Privacy({ navigation }) {
    return (
      <>
        <Text>This is the privacy Screen</Text>
        <Button title='Go Back' onPress={() => navigation.goBack()}/>
      </>
    );
  };

  function Notification({ navigation }) {
    return (
      <>
        <Text>This is the Notification Screen</Text>
        <Button title='Go Back' onPress={() => navigation.goBack()}/>
      </>
    );
  };

  function Rate5Star({ navigation }) {
    const handleRateApp = async () => {
      if (Platform.OS === 'ios' && StoreReview.requestReview) {
        try {
          await StoreReview.requestReview();
        } catch (error) {
          console.error('Failed to request a review:', error);
          openAppStoreLink();
        }
      } else if (Platform.OS === 'android' && InAppReview.RequestInAppReview) {
        try {
          await InAppReview.RequestInAppReview();
        } catch (error) {
          console.error('Failed to request a review:', error);
          openAppStoreLink();
        }
      } else {
        openAppStoreLink();
      }
    };
  };

  const openAppStoreLink = () => {
    const storeUrl = Platform.OS === 'ios'
      ? 'https://apps.apple.com/us/app/among-us/id1351168404'
      : 'market://details?id=com.innersloth.spacemafia';
    Linking.openURL(storeUrl).catch((err) => console.error('Error opening store link', err));
  };

  function TermsNConditions({ navigation }) {
    return (
      <>
        <Text>This is the Terms and Conditions Screen</Text>
        <Button title='Go Back' onPress={() => navigation.goBack()}/>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="links" component={Links} options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="Privacy" component={Privacy} options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="TermsNConditions" component={TermsNConditions} options={{ headerShown: false, presentation: 'card' }} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: Platform.OS === 'ios' ? 120 : 90,
    alignItems: 'center',
    textAlign: 'center',
  },
  header: {
    backgroundColor: 'lightblue',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    width: '100%',
    height: '30%',
    overflow: 'hidden',
    paddingTop: 10,
    paddingHorizontal: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  img_container: {
    width: 120,
    height: 120,
    overflow: 'hidden',
    borderRadius: 60,
    padding: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  img: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
    padding: 3,
  },
  body: {
    width: '100%',
    padding: 10,
    marginVertical: -50,
    paddingVertical: 60,
  },
  line: {
    height: 1,
    backgroundColor: 'blue',
    opacity: 0.5,
    margin: 10,
    width: '95%',
    alignSelf: 'center',
  },
  item: {
    width: '98%',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'lightblue',
  }
});

export default SettingsScreen