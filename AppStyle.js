import React, { createContext, useContext, useState } from 'react';
import { StyleSheet } from "react-native";
const StyleContext = createContext();

export function StyleProvider({ children }) {
    const [background, setBackground] = useState('white');
    const [color, setColor] = useState('black');

    const toggleBG = () => {
        console.log('bg color changed');
        setBackground(background === 'white'? 'black' : 'white');
    }

    const toggleColor = () => {
        console.log('color changed');
        setColor(color === 'black'? 'white' : 'black');
    }

    const toBlue =() => {
        setBackground('lightblue');
    }

    const toWhite =() => {
        setBackground('white');
    }

    const toBlack =() => {
        setBackground('black');
    }

    const toAppColor =() => {
        setBackground('#8EDFEB');
    }

    const toHomeColor =() => {
        setBackground('#8EDFEB');
    }

    const appStyles = StyleSheet.create({
        container: {
            flex: 1,
        },
        background: {
            backgroundColor: background,
        },
        color: {
            color: color,
        },
        top: {
            marginTop: Platform.OS === 'ios' ? 30 : 20,
        }
    })

    return (
        <StyleContext.Provider value={{ appStyles, toggleBG, toggleColor, toBlue, toBlack, toWhite, toAppColor, toHomeColor }}>
            {children}
        </StyleContext.Provider>
    );
}
export function useStyle() {
  return useContext(StyleContext);
}