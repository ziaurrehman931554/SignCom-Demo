import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useStyle } from '../AppStyle';

export default function AboutScreen() {
    const aboutDescription = "SIGNCOM is a real-time vision-based application that enables seamless video communication between individuals who use sign language and those who communicate through spoken language, by leveraging advanced hand sign recognition and translation technologies in real-time. This will enable everyone to interact with each other over the internet and to converse with each other through video calling, regardless of their disabilities.";
    const { toWhite } = useStyle();
    const navigation = useNavigation();
    const navigationState = useNavigationState((state) => state);

    useEffect(() => {
        toWhite();
    }, [navigationState])

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.backContainer}>
                    <Text>🔙</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.headerText}>About</Text>
            </View>
        </View>
        <View style={styles.aboutContainer}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>
            <ScrollView style={styles.textContainer}>
                <Text style={styles.text}>{aboutDescription}</Text>
            </ScrollView>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        paddingLeft: 25,
    },
    backContainer: {
        width: 63,
        height: 34.42,
        borderRadius: 20,
        backgroundColor: '#5164BF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingLeft: 30,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    aboutContainer: {
        borderWidth: 1,
        margin: 25,
        marginTop: 40,
        borderRadius: 20,
        borderColor: '#0166FF',
        padding: 15,
        height: '75%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column"
    },
    logoContainer: {
        height: '45%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 150,
        width: 170,
        alignSelf: 'center'
    },
    textContainer: {
        flex: 1,
        height: '55%',
        borderRadius: 20,
        borderColor: '#0166FF',
        padding: 15,
        margin: 10,
        backgroundColor: '#8EDFEB',
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 5,
    },
    text: {
        fontSize: 15,
        textAlign: 'justify',
    },
});
