import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

interface SquareBoxProps {
    text: string;
    onPress: () => void;
}

const SquareBox: React.FC<SquareBoxProps> = ({ text, onPress }) => {
    const backgroundColor = (text === 'Previous' ? '#FFFFFF' : '#8A47EB');
    const fontColor = (text === 'Previous' ? '#000000' : '#FFFFFF');

    return (
        <TouchableHighlight
            style={[styles.container, {backgroundColor}]}
            underlayColor="transparent"
            onPress={onPress}
        >
            <View style={styles.square}>
                <Text style={[styles.text, {color: fontColor}]}>{text}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 100,
        height: 50,
        overflow: 'hidden',
    },
    square: {
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
});

export default SquareBox;
