import React from "react";
import { View, Text, Button } from "react-native";

export default function CallingScreen  ({ user, navigation })  {
    return (
        <View>
            <Text>Calling {user.Name}</Text>
            <Button
                title="Go Back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};
