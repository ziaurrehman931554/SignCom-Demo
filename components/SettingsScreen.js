import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useStyle } from '../AppStyle';
import { useUser } from '../UserContext';

export default function SettingsScreen({ userToken }) {
  const { updateUserByEmail } = useUser();
  const { toWhite } = useStyle();
  const navigation = useNavigation();
  const navigationState = useNavigationState((state) => state);
  const [ isKBActive, setIsKBActive ] = useState(false);
  const [ hidePass, setHidePass ] = useState(true);

  const [ user, setUser ] = useState(
    { Name: userToken.Name, email: userToken.email, password: userToken.password, type: userToken.type }
  )

  const togglePasswordVisibility = () => {
    setHidePass((prev) => !prev);
  };

  const handleInputChange = (fieldName, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    updateUserByEmail(userToken.email, user);
    alert("User Data Updated!");
    setTimeout(() => {
      navigation.goBack();
    }, 3000);
  };

  useEffect(() => {
    toWhite();
  }, [navigationState])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBTNContainer}>
          <Text style={styles.backBTN}>🔙</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.YPI}>Your Profile Information</Text>
          <View style={styles.profileImageContainer}>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/Profile.png')} style={styles.image}/>
            </View>
            <View style={styles.editContainer}>
              <Image source={require('../assets/edit.png')} style={styles.edit}/>
            </View>
          </View>
          <Text style={styles.PI}>Personal Information</Text>
          <View style={styles.entityContainer}>
            <Text style={styles.entityName}>Name</Text>
            <TextInput style={styles.entityValue} placeholder='Enter Your name' value={user.Name} onChangeText={(text) => handleInputChange('Name', text)}></TextInput>
          </View>
          <View style={styles.entityContainer}>
            <Text style={styles.entityName}>Email</Text>
            <TextInput style={styles.entityValue} placeholder='Enter Your email' value={user.email} onChangeText={(text) => handleInputChange('email', text)}></TextInput>
          </View>
          <TouchableOpacity style={styles.entityContainer} onPress={togglePasswordVisibility}>
            <Text style={styles.entityName}>Password</Text>
            <TextInput style={styles.entityValue} placeholder='Enter Your password' secureTextEntry={hidePass} value={user.password} onChangeText={(text) => handleInputChange('password', text)}></TextInput>
          </TouchableOpacity>
          <View style={styles.entityContainer}>
            <Text style={styles.entityName}>Type</Text>
            {/* {Platform.OS === 'ios' && ( */}
              <RNPickerSelect
              value={user.type}
              items={[
                { label: 'Normal', value: 'normal' },
                { label: 'Special', value: 'special' },
              ]}
              onValueChange={(value) => handleInputChange('type', value)}
              style={pickerSelectStyles}
            />
            {/* )} */}
          </View>
        </View>
        { !isKBActive && (
          <TouchableOpacity style={styles.saveContainer} onPress={handleSave}>
            <Text style={styles.save}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: '#909BB1',
    alignItems: 'center',
    borderRadius: 4,
    textAlign: 'right',
  },
  inputAndroid: {
    fontSize: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: '#909BB1',
    alignItems: 'center',
    borderRadius: 4,
    textAlign: 'right',
  },
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 5,
    marginLeft: 20,
  },
  backBTNContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 63,
    height: 34.42,
    borderRadius: 20,
    backgroundColor: '#5164BF',
  },
  backBTN: {
    fontSize: 20,
    color: 'white',
  },
  headerText: {
    fontSize: 20,
    marginLeft: 20,
  },
  bodyContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  YPI: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#878787',
    marginVertical: 15,
    opacity: 0.7,
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  editContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#5164BF',
    borderColor: 'white',
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    width: 20,
    height: 20,
  },
  PI: {
    fontSize: 17,
    marginBottom: 10,
    lineHeight: 22,
    textAlign: 'left',
    width: '95%',
    padding: 10,
    marginTop: 30,
    marginBottom: 5,
    color: '#5164BF',
    opacity: 0.7,
  },
  entityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    margin: 5,
    backgroundColor: '#F4F4F4',
    padding: 15,
    borderRadius: 10,
    height: 50,
  },
  entityName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5164BF',
  },
  entityValue: {
    fontSize: 12,
    color: '#909BB1',
    textAlign: 'right',
  },
  saveContainer: {
    height: 60,
    width: 175,
    borderRadius: 50,
    backgroundColor: '#5164BF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  save: {
    fontSize: 17,
    color: 'white',
  },
})