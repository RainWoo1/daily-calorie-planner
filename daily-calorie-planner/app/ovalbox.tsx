import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

interface OvalBoxProps {
    text: string;
}

const OvalBox: React.FC<OvalBoxProps> = ({ text }) => {
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [isPressedIn, setIsPressedIn] = useState(false);

    const handlePress = () => {
        setIsHighlighted(!isHighlighted);
    };
    const handlePressIn = () => {
        setIsPressedIn(!isPressedIn);
        alert(isPressedIn);
    };

    return (
        <TouchableHighlight
            style={[styles.container, isHighlighted && styles.highlighted]}
            onPress={handlePress}
            onPressIn={handlePressIn}
            underlayColor="transparent"
        >
            <View style={styles.oval}>
                <Text style={[styles.text, isHighlighted && styles.fontHighlighted]}>{text}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 100,
        height: 50,
        overflow: 'hidden',
    },
    oval: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
    },
    highlighted: {
        backgroundColor: '#8A47EB',
    },
    fontHighlighted: {
        color: '#FFFFFF',
    },
    fontNonHighlighted: {
        color: '#000000',
    },
});

export default OvalBox;
