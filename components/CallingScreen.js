import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Platform } from "react-native";
import { Camera } from "expo-camera";
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function CallingScreen({ route }) {
  const user = route?.params?.user;
  const navigation = useNavigation();
  const navigationState = useNavigationState((state) => state);

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [text, setText] = useState("This is container where the text of the signs are displayed.");
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCallOngoing, setIsCallOngoing] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleEndCall = () => {
    setIsCallOngoing(false);
    navigation.goBack();
  };

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    );
  };

  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
  };

  return (
    <ImageBackground style={{ flex: 1, padding: 10 }} source={require('../assets/background.png')}>
      <View style={{ bottom: 0, position: "absolute", width: '110%', alignSelf: 'center', marginBottom: 10, zIndex: 2 }}>
        <View style={styles.capNCamContainer}>
          <View style={styles.captionContainer}>
            <Text style={styles.caption}>{text}</Text>
          </View>
          <View style={styles.myCamContainer}>
            {isCallOngoing && (
              <Camera
                style={{ flex: 1, borderRadius: 11, zIndex: -1 }}
                type={cameraType}
                ref={(ref) => setCameraRef(ref)}
              />
            )}
          </View>
        </View>
        <View style={styles.controlContainer}>
          <TouchableOpacity
            style={styles.controlOptionContainer}
            onPress={toggleCameraType}
            disabled={!isCallOngoing}
          >
            <Text style={styles.controlOption}>🔄</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlOptionContainer, { backgroundColor: '#FF0000' }]}
            onPress={handleEndCall}
            disabled={!isCallOngoing}
          >
            <Text style={styles.controlOption}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlOptionContainer}
            onPress={toggleMic}
            disabled={!isCallOngoing}
          >
            <Text style={styles.controlOption}>{isMicMuted ? '🔇' : '🎤'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.otherCamContainer}>
        {isCallOngoing && (
          <Camera
            style={{ flex: 1, borderRadius: 11, zIndex: -1  }}
            type={Camera.Constants.Type.back}
            ref={(ref) => setCameraRef(ref)}
          />
        )}
      </View>
      <StatusBar style="dark" />
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
    capNCamContainer: {
        bottom: 0,
        display: 'flex',
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    captionContainer: {
        height: 76,
        width: 198,
        borderRadius: 11,
        backgroundColor: '#636262', 
        margin: 6,
    },
    caption: {
        padding: 5,
        fontSize: 17,
        color: 'white',
    },
    myCamContainer: {
        overflow: "hidden",
        height: 191,
        borderWidth: 1,
        width: 115,
        borderRadius: 11,
        margin: 3,
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: '#74ACD9',
    },
    controlContainer: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 10,
    },
    controlOptionContainer: {
        height: 80,
        width: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        fontSize: 40,
    },
    otherCamContainer: {
        overflow: "hidden",
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#74ACD9',
        width: '95%',
        height: 557,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 0,
        borderWidth: 1,
        borderColor: '#74ACD9',
    },
})