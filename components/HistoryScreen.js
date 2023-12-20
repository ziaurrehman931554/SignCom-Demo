import React from "react";
import { ImageBackground, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native";

const HistoryScreen = ({userToken, store, navigation}) => {
    const renderRecent = () => {
      return (
        <>
        {userToken.recent.map((item) => (
          <TouchableOpacity style={styles.recentContainer} key={item.Name} onPress={() => {store(item); navigation.navigate('Call');}}>
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

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.png')} style={StyleSheet.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backContainer} onPress={() => {navigation.navigate('Home')}}>
                        <Text style={styles.back}>🔙</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>History</Text>
                </View>
                <ScrollView style={styles.bodyContainer}>
                    {renderRecent()}
                </ScrollView>
            </ImageBackground>
        </View>
    )
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
    bodyContainer: {
        margin: 10,
        height: '100%',
    },
    recentContainer: {
        flexDirection: 'row',
        margin: 10,
        padding: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowColor: 'black',
        alignItems: 'center',
    },
    recent_img: {
        flex: 1,
    },
    recent_profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        margin: 5,
    },
    recent_data: {
        flex: 4,
        padding: 5,
    },
    recent_data_name: {
        fontSize: 18,
    },
    recent_data_time: {
        fontSize: 10,
        color: '#1E1E1E',
    },
    recent_info: {
        flex: 0.5,
    },
    recent_info_text: {
        fontSize: 15,
    },
})

export default HistoryScreen;