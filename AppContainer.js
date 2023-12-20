import React, { useState, useEffect }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { useStyle } from './AppStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native-animatable';

import OnBoardingScreen1 from './components/OnBoardingScreen1';
import OnBoardingScreen2 from './components/OnBoardingScreen2';
import OnBoardingScreen3 from './components/OnBoardingScreen3';
import OnBoardingScreen4 from './components/OnBoardingScreen4';
import MainApp from './components/MainApp';

export default function AppContainer() {
    const { appStyles, toWhite } = useStyle();
    const statusBack = appStyles.background.backgroundColor == 'white' ? 'dark': 'light';
    const [showOnboarding, setShowOnboarding] = useState(false);
  
  function OnboardingContainer() {
    const [currentScreen, setCurrentScreen] = useState(1);
  
    const handleNext = () => {
      if (currentScreen < 4) {
        setCurrentScreen(currentScreen + 1);
      } else {
        AsyncStorage.setItem('onboarding', 'completed');
        setShowOnboarding(false);
        console.log('done')
      }
    };
  
    return (
      <>
        {currentScreen === 1 && <OnBoardingScreen1 onNext={handleNext} />}
        {currentScreen === 2 && <OnBoardingScreen2 onNext={handleNext} />}
        {currentScreen === 3 && <OnBoardingScreen3 onNext={handleNext} />}
        {currentScreen === 4 && <OnBoardingScreen4 onNext={handleNext} />}
      </>
    );
  }

  useEffect(() => {
    async function checkOnboarding() {
      try {
        const onboardingStatus = await AsyncStorage.getItem('onboarding');
        if (onboardingStatus === null) {
          setShowOnboarding(true);
        }
        else{
          setShowOnboarding(false);
        }
      } catch (error) {
      }
    }
    toWhite();
    checkOnboarding();
  }, []);

  const handleReset = async () => {
    try {
      await AsyncStorage.removeItem('onboarding');
      setShowOnboarding(true);
    } catch (error) {
    }
  };
    return(
        <View style={[appStyles.background, appStyles.container]}>
            {showOnboarding ? (
              <OnboardingContainer />
            ) : (
              <MainApp reset={handleReset}/>
            )}
            <StatusBar style={statusBack} />
        </View>
    )
};