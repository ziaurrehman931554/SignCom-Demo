import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { useStyle } from '../AppStyle';
import { useIsFocused } from '@react-navigation/native';

export default function DrawerScreen({ navigation, user, onLogout }) {
  const { toHomeColor } = useStyle();
  const u = user ? user.Name : '';
  const isFocused = useIsFocused();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideIn = useRef(new Animated.Value(-270)).current;

  const fadeInAnimation = Animated.timing(fadeIn, {
    toValue: 1,
    duration: 500,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: false,
  });

  const fadeOutAnimation = Animated.timing(fadeIn, {
    toValue: 0,
    duration: 500,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: false,
  });

  const slideInAnimation = Animated.timing(slideIn, {
    toValue: 0,
    duration: 500,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: false,
  });

  const slideOutAnimation = Animated.timing(slideIn, {
    toValue: -370,
    duration: 500,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: false,
  });

  useEffect(() => {
    toHomeColor();
    handleOpenDrawer();
  }, [isFocused]);

  const handleOpenDrawer = () => {
    Animated.parallel([fadeInAnimation, slideInAnimation]).start();
  };

  const handleCloseDrawer = () => {
    Animated.parallel([fadeOutAnimation, slideOutAnimation]).start();
    setTimeout(() => {
      navigation.navigate('Home');
    }, 500)
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: fadeIn.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(200, 200, 230, 0)', 'rgba(200, 200, 230, 0.6)']
      }) }]}>
      <Animated.View style={[styles.containerS, { transform: [{ translateX: slideIn }] }]}>
        <TouchableOpacity style={styles.backContainer} onPress={handleCloseDrawer}>
          <Text style={styles.back}>❌</Text>
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <View style={styles.profileImgContainer}>
            <Image style={styles.profileImg} source={require('../assets/Profile.png')} />
          </View>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>{u}</Text>
          </View>
        </View>
        <View style={styles.itemsContainer}>
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Account')}>
            <Text style={styles.item}>🥷 Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('About')}>
            <Text style={styles.item}>ℹ️ About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.item}>⚙️ Settings</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onLogout} style={styles.logoutContainer}>
          <Text style={styles.logoutImage}>📴</Text>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  containerS: {
    flex: 1,
    width: 270,
    backgroundColor: 'white',
    marginVertical: 10,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  backContainer: {
    height: 30,
    width: 30,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
  },
  profileContainer: {
    height: 250,
    alignItems: 'flex-start',
    padding: 10,
  },
  profileImgContainer: {
    height: 150,
    width: 150,
    borderRadius: 80,
    overflow: 'hidden',
    marginVertical: 5,
  },
  profileImg: {
    height: 140,
    width: 140,
    alignSelf: 'center',
  },
  profileNameContainer: {
    height: 40,
    width: '90%',
    marginVertical: 5,
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  itemsContainer: {
    paddingLeft: 10,
  },
  itemContainer: {
    paddingVertical: 15,
    borderRadius: 50,
  },
  item: {
    fontSize: 15,
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 40,
    left: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    width: 140,
    backgroundColor: '#5164BF',
    borderRadius: 30,
  },
  logoutImage: {
    marginHorizontal: 5,
  },
  logout: {
    color: 'white',
  }
});
