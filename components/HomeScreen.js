import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView,ImageBackground , StyleSheet, Image, TextInput, FlatList, Button, ScrollView, TouchableOpacity, TouchableHighlight, Platform } from 'react-native';
import { useUser } from '../UserContext';
import { useStyle } from '../AppStyle';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';
import  MakeCallScreen from './CallScreen'
import  AccountScreen from './AccountScreen'

const Stack = createStackNavigator();
 
const HomeScreen = ({userToken, store, navigation}) => {
  const { appStyles, toHomeColor } = useStyle();
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      toHomeColor();
    }  
  }, []);

    const renderFavorites = () => {
    return (
      <ScrollView
        horizontal
        contentContainerStyle={styles.fav_wrapper}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {userToken.favorites.map((item) => (
          <TouchableOpacity
            style={styles.fav_container}
            key={item.Name}
            onPress={() => navigation.navigate('Call', { user: item })}
          >
            <View style={styles.fav_img}>
              <Image source={require('../assets/Profile.png')} style={styles.fav_profileImage} />
            </View>
            <Text style={styles.fav_name}>{item.Name}</Text>  
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

    const renderRecent = () => {
      return (
        <>
        {userToken.recent.map((item) => (
          <TouchableOpacity
            style={styles.recent_container} 
            key={item.Name} 
            onPress={() => navigation.navigate('Call', { user: item })}
          >
            <View style={styles.recent_img}>
              <Image source={require('../assets/Profile.png')} style={styles.recent_profileImage} />
            </View>
            <View style={styles.recent_data}>
              <Text style={styles.recent_data_name}>{item.Name}</Text>
              <Text style={styles.recent_data_time}>{item.last_call}</Text>
            </View>
            <View style={styles.recent_info}>
              <Text style={styles.recent_info_text}>
                ❗
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        </>
      );
    };

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.menuContainer}>
          <Image source={require('../assets/menu.png')} style={styles.menu}/>
        </View>
        <Text style={styles.hi}>Hi,</Text>
        <Text style={styles.name}>{userToken.Name}</Text>
        <View style={styles.searchContainer}>
          <Image source={require('../assets/search.png')} style={styles.search}/>
          <TextInput placeholder='Search' style={styles.input} onChangeText={(text) => setSearch(text)}/>
        </View>
      </View>
      <ScrollView style={styles.bodyContainer}>
        {userToken.favorites && !search && (
          <View style={styles.favoritesContainer}>
            <View style={styles.heading}>
              <Text style={styles.headingText}>Favorites</Text>
              <Text style={styles.headingEdit}>Edit {'>'}</Text>
            </View>
            <View style={styles.renderFavContainer}>
              {renderFavorites()}
            </View>
          </View>
        )}
        {userToken.recent && !search && (
          <View style={styles.recentContainer}>
            <View style={styles.heading}>
              <Text style={styles.headingText}>Recent</Text>
              <Text style={styles.headingEdit}>History {'>'}</Text>
            </View>
            <View>
              {renderRecent()}
            </View>
          </View>
        )}
        <View style={styles.addPad}></View>
      </ScrollView>
      <StatusBar style="Dark" />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 250,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  menuContainer: {
    width: 30,
    height: 30,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menu: {
    height: 30,
    width: 30,
    resizeMode: 'cover',
  },
  hi: {
    fontSize: 30,
    color: 'white',
    marginTop: 10,
    paddingTop: 10,
  },
  name: {
    fontSize: 40,
    color: '#5163BF',
    marginBottom: 15,
    marginTop: Platform.OS==='ios' ? -7 : -20,
    fontWeight: 'bold',
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 15,
    borderColor: '#5163BF',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
  },
  search: {
    width: '7%',
    height: '50%',
    padding: 10,
  },
  input: {
    width: '90%',
  },
  bodyContainer: {
    width: '100%',
    padding: 15,
    display: 'flex',
    paddingRight: -11,
  },
  favoritesContainer: {
    width: '95%',
    height: 180,
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 5,
  },
  headingText: {
    color: 'white',
    fontSize: 15,
  },
  headingEdit: {
    color: 'white',
    textDecorationLine: 'underline', 
  },
  recentContainer: {
    width: '95%',
  },
  renderFavContainer: {
    flex: 1,
    backgroundColor: '#D5F2F9',
    borderRadius: 20,
    padding: 5,
    overflow: 'hidden',
  },
  addPad: {
    width: '100%',
    height: Platform.OS === 'ios' ? 120 : 107,
  },
  fav_container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 15,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    margin: 5,
  },
  fav_img: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    padding: 10,
    borderRadius: 50,
  },
  fav_profileImage:{
    height: '100%',
    width: '100%',
  },
  recent_container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    margin: 5,
    marginRight: 0,
  },
  recent_img: {
    width: 60,
    height: 60,
    overflow: 'hidden',
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#D9D9D9',
  },
  recent_profileImage: {
    height: '100%',
    width: '100%',
  },
  recent_data: {
    width: 220,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  recent_data_name: {
    width: '100%',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  recent_data_time: {
    width: '100%',
    overflow: 'hidden',
  },
  recent_info: {
    width: 30,
    height: 30,
    overflow: 'hidden',
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#D9D9D9',
  },
  recent_info_text: {
    color: 'black',
  },
})

export default HomeScreen;