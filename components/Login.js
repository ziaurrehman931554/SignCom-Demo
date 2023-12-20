import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useUser } from '../UserContext';
import { useStyle } from '../AppStyle';

const Login = ({ onLogin, reset }) => {
  const { toWhite } = useStyle();
  const { getUserData, addUserToData } = useUser();
  const users = getUserData();

  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    type: '',
    profile: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus ] = useState('login')

  useEffect(() => {
    toWhite();
  }, []);

  const handleAuthentication = () => {
    setLoading(true);
    setTimeout(() => {
      if (status === 'login') {
        handleLogin();
      } else {
        handleSignup();
      }
      setLoading(false);
    }, 500);
  };

  const handleLogin = () => {
    if (user.email === '' || user.password === '') {
      showAlert('Error', 'Please fill all the fields');
      return;
    }
    const foundUser = users.filter(item => {
      return user.email === item.email && user.password === item.password;
    }); 
    if (foundUser.length === 0) {
      showAlert('Error', 'Invalid Email or Password');
      return;
    }
    onLogin(user.email);
  }

  const handleSignup = () => {
    if (user.password !== user.confirmPassword) {
      showAlert('Error', 'Passwords do not match');
      return;
    }
    if (user.name === '' || user.email === '' || user.password === '' || user.confirmPassword === '' || user.type === '') {
      showAlert('Error', 'Please fill all the fields');
      return;
    }
    handleAddUser();
  }

  const handleAddUser = () => {
    const updatedUsers = [...users, user];
    addUserToData(user);
    onLogin(user.email);
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.bodyContainer}>
        <TouchableOpacity onPress={reset}>
          <Text style={styles.title}>{status === 'login' ? 'Log in' : 'Sign up'}</Text>
        </TouchableOpacity>
        <Text style={styles.textTitle}>Email Address</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email ID"
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
            style={styles.input}
          />
          <Text>✅</Text>
        </View>
        <View style={styles.line}></View>
        <Text style={styles.textTitle}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={user.password}
            onChangeText={(text) => setUser({ ...user, password: text })}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text>{showPassword ? '🔴' : '🟢'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        {status === 'signup' && (
          <>
            <Text style={styles.textTitle}>Name</Text>
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
              <TextInput style={styles.input} placeholder="Name" value={user.name} onChangeText={(text) => setUser({ ...user, name: text })}/>
              <Text>✅</Text>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.textTitle}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                value={user.confirmPassword}
                onChangeText={(text) => setUser({ ...user, confirmPassword: text })}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text>{showPassword ? '🔴' : '🟢'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
            <Text style={styles.textTitle}>Type<Text style={{fontSize: 10, color: '#878787', opacity: 0.5, textAlign: 'right', width: '100%'}}> Currently: {user.type}</Text></Text>
            <View style={styles.typeContainer}>
              <TouchableOpacity style={styles.type} onPress={() => setUser({ ...user, type: 'Normal' })}>
                <Text style={styles.typeText}>Normal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.type} onPress={() => setUser({ ...user, type: 'Specially-abled' })}>
                <Text style={styles.typeText}>Specially-abled</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View style={styles.btnContainerC}>
        <TouchableOpacity onPress={handleAuthentication} style={styles.btnContainer} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.btn}>{status === 'login' ? 'Login' : 'Signup'}</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.accountContainer}>
        <Text style={styles.accText}>
          {status === 'login' ? (
            <Text>
              Don't have an account?{' '}
              <TouchableOpacity onPress={() => setStatus('signup')}>
                <Text style={styles.accBtn}>Signup</Text>
              </TouchableOpacity>
            </Text>
          ) : (
            <Text>
              Already have an account?{' '}
              <TouchableOpacity onPress={() => setStatus('login')}>
                <Text style={styles.accBtn}>Login</Text>
              </TouchableOpacity>
            </Text>
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logoContainer: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 70,
    width: 80,
  },
  bodyContainer: {
    height: '70%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 15,
    maxHeight: '70%',
  },
  btnContainerC:{
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: 170,
    alignItems: 'center',
    backgroundColor: '#5063BF',
    borderRadius: 15,
    paddingHorizontal: 45,
    paddingVertical: 15,
    color: 'white',
  },
  btn: {
    color: 'white',
    fontSize: 20,
  },
  accountContainer: {
    height: '10%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  accText: {
    color: '#878787',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accBtn: {
    color: '#5063BF',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    lineHeight: 42,
    paddingVertical: 15,
  },
  textTitle: {
    color: '#5063BF',
    fontSize: 13,
    paddingVertical: 15,
  },
  input: {
    width: '90%',
    padding: 5,
  },
  line: {
    width: '95%',
    alignSelf: 'center',
    margin: 5,
    height: 1,
    backgroundColor: '#878787',
  },
  typeContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  type: {
    alignItems: 'center',
    width: '50%',
    padding: 15,
    backgroundColor: '#5063BF',
    borderWidth: 2,
    borderColor: 'black',
  },
  typeText: {
    color: 'white',
    fontSize: 18,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Login;
