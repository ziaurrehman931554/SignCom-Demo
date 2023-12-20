import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useStyle } from '../AppStyle';

const OnBoardingScreen1 = ({onNext}) => {
    const { appStyles } = useStyle();
    return (
        <View style={styles.container}>
            <View style={[ styles.logoContainer]}>
                <Image source={require('../assets/logo.png')} style={styles.logo}/>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.welcome}>Welcome to</Text>
                <Text style={styles.signcom}>SignCom.</Text>
                <Text style={styles.slug}>Bridging the Gap , Uniting the World</Text>
                <TouchableOpacity onPress={onNext} style={styles.btnContainer}>
                    <Text style={styles.btn}>Get Started</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style={'light'} />
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A7C0E4',
        borderWidth: 1,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '50%',
        width: '100%',
        paddingBottom: 5,
    },
    logo: {
        height: 150,
        width: 170,
    },
    bodyContainer: {
        alignItems: 'center',
        padding: 5,
    },
    welcome: {
        fontSize: 60,
        color: 'white',
    },
    signcom: {
        fontSize: 50,
        color: '#5063BF',
        fontWeight: 'bold',
    },
    slug: {
        color: 'white',
        paddingVertical: 40,
        fontSize: 15,
        letterSpacing: 2
    },
    btnContainer: {
        backgroundColor: '#5063BF',
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 15,
        color: 'white',
        marginVertical: 35,
    },
    btn: {
        color: 'white',
        fontSize: 20,
    }
});

export default OnBoardingScreen1;
