import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useStyle } from '../AppStyle';

const OnBoardingScreen3 = ({onNext}) => {
    const { appStyles } = useStyle();
    return(
        <View style={styles.container}>
            <View style={[appStyles.top, styles.topContainer]}>
                <Image source={require('../assets/logo.png')} style={styles.logo}/>
                <Image source={require('../assets/page2.png')} style={styles.img}/>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.title}>AI Incorporated</Text>
                <Text style={styles.description}>Makes Communication easy by Translating Sign language to speech and text.Vice-versa</Text>
                <View style={styles.screenContainer}>
                    <View style={styles.faded}></View>
                    <View style={styles.current}></View>
                    <View style={styles.faded}></View>
                </View>
                <TouchableOpacity onPress={onNext} style={styles.continueContainer}>
                    <Text style={styles.continueBtn}>Continue</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style={'dark'} />
        </View>
    );
};

const styles = StyleSheet.create({
     container: {
        backgroundColor: '#F1F2FA',
        flex: 1,
     },
     topContainer: {
        paddingTop: 10,
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
     },
     logo: {
        height: 50,
        width: 60,
     },
     img: {

        height: '90%',
        width: '90%',
     },
     bottomContainer: {
        height: '50%',
        width: '100%',
        alignItems: 'center',
     },
     title: {
        fontSize: 40,
        width: '100%',
        textAlign: 'center',
        paddingVertical: 10,
        color: '#1E1E1E'
     },
     description: {
        paddingVertical: 10,
        color: '#878787',
        textAlign: 'center',
     },
     screenContainer: {
        marginTop: 50,
        width: '100%',
        height: '5%',
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
     },
     current: {
        height: 7,
        width: 7,
        borderRadius: 5,
        backgroundColor: '#5063BF',
        margin: 5,
     },
     faded: {
        height: 7,
        width: 7,
        borderRadius: 5,
        backgroundColor: '#8EDFEB',
        margin: 5,
     },
     continueContainer: {
        backgroundColor: '#5063BF',
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 15,
        color: 'white',
        marginVertical: 35,
     },
     continueBtn: {
        color: 'white',
        fontSize: 20,
     }
});

export default OnBoardingScreen3;
