import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native';
import { useStyle } from '../AppStyle';

const CallScreen = ({navigation, route}) => { 
  const { appStyles, toggleBG, toggleColor, toBlue, toWhite } = useStyle();
  let user = route?.params?.user;
  const u = user? user.Name: '';
  const [callID, setCallId] = useState('-');
  const [joinID, setJoinId] = useState('');
 
  const generateCallID = () => {
    const id = Math.floor(Math.random() * 1000000);
    setCallId(id);
    setTimeout(() => {
      if (user?.Name) {
        navigation.navigate('MakeCall', {user : user});
      } else {
        navigation.navigate('MakeCall', { user : {Name: ''} });
      }
    }, 3000)
  }

  const HandleJoin = () => {
    if (user?.Name) {
      navigation.navigate('MakeCall', {user : user});
    } else {
      navigation.navigate('MakeCall', { user : {Name: ''} });
    }
  }

  return (
    <ImageBackground source={require('../assets/background.png')}>
      <View style={styles.header}>
        <View style={styles.backContainer}>
          <Text style={styles.back}>🔙</Text>
        </View>
        <Text style={styles.headerText}>Make a Call</Text>
      </View>
      <View style={styles.joinContainer}>
        <Text style={styles.title}>Join Using Call ID</Text>
        <View style={styles.imgContainer}>
          <Image source={require('../assets/join.png')} style={styles.img}/>
        </View>
        <TextInput style={styles.input} placeholder='Enter Call ID' value={joinID} onChangeText={(Text) => {setJoinId(Text)}}/>
        <TouchableOpacity style={styles.btn} onPress={HandleJoin}>
          <Text style={styles.btnText}>Join {u && (<Text>{u}</Text>)}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View style={styles.joinContainer}>
        <Text style={styles.title}>Generate a Call ID {u && (<Text>for {u}</Text>)}</Text>
        <View style={styles.imgContainer}>
          <Image source={require('../assets/join.png')} style={styles.img}/>
        </View>
        <Text style={styles.id}>{callID}</Text>
        <TouchableOpacity style={styles.btn} onPress={generateCallID}>
          <Text style={styles.btnText}>Generate</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addPad}></View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  addPad: {
    width: '100%',
    height: 100,
  },
  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  backContainer: {
    width: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#5164BF',
    marginLeft: 10,
  },
  back: {
    color: 'white',
  },
  headerText: {
    position: 'absolute',
    left: 0,
    width: '105%',
    textAlign: 'center',
    fontSize: 20,
    alignSelf: 'center',
  },
  joinContainer: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  imgContainer: {
    width: 140,
    height: 140,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  img: {
    width: '120%',
    height: '120%',
    alignSelf: 'center',
  },
  input: {
    height: 33,
    width: '70%',
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    textAlign: 'center',
    padding: 7,
    marginVertical: 10,
  },
  id: {
    backgroundColor: '#D9D9D9',
    textAlign: 'center',
    height: 33,
    padding: 7,
    marginVertical: 10,
    width: '70%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  btn: {
    width: '40%',
    height: 45,
    backgroundColor: '#5D94DD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginVertical: 10,
  },
  btnText: {
    color: 'black',
    fontWeight: 'bold',
  },
  callID: {
    width: '70%',
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    textAlign: 'center',
    padding: 7,
  },
  line: {
    width: '90%',
    height: 3,
    alignSelf: 'center',
    backgroundColor: '#517A90',
  },
})

export default CallScreen;