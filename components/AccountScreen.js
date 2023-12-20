import React, { useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useStyle } from '../AppStyle';

export default function AccountScreen({userToken, onLogout, navigation}){
  const { toWhite } = useStyle();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backContainer} onPress={navigation.navigate('Home')}>
                    <Text>🔙</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Account</Text>
            </View>
            <View style={styles.body}>
                <View style={[styles.body, {borderColor: '#0166FF', borderRadius: 20, borderWidth: 1,}]}>
                    <View style={styles.profileContainer}>
                        <View style={styles.imgContainer}>
                            <Image source={require('../assets/Profile.png')} style={styles.img}/>
                        </View>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.entryContainer}>
                            <Text style={styles.entryLabel}>Name</Text>
                            <Text style={styles.entryText}>{userToken.Name}</Text>
                        </View>
                        <View style={styles.entryContainer}>
                            <Text style={styles.entryLabel}>Email</Text>
                            <Text style={styles.entryText}>{userToken.email}</Text>
                        </View>
                        <TouchableOpacity style={styles.entryContainer} onPress={onLogout}>
                            <Text style={styles.entryLabel}>Type</Text>
                            <Text style={styles.entryText}>{userToken.type}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    body: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '95%',
        height: '80%',
        padding: 5,
        alignSelf: 'center',
    },
    profileContainer: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 140,
        height: 140,
        borderRadius: 100,
    },
    dataContainer: {
        width: '97%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    entryContainer: {
        width: '100%',
        height: '33%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginLeft: 15,
    },
    entryLabel: {
        fontSize: 17,
        color: '#5164BF',
        width: 90,
    },
    entryText: {
        fontSize: 17,
    },
})