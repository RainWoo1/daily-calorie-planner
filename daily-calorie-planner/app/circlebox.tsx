import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

interface CircleBoxProps {
    text: number;
    state: number;
}

const CircleBox: React.FC<CircleBoxProps> = ({ text, state }) => {
    const backgroundColor = (text < state + 1 ? ('#FFFFFF') : (text > state + 1 ? ('#EAEAEA') : ('#8A47EB')));
    const fontColor = (backgroundColor === '#8A47EB' ? '#FFFFFF' : '#000000');

    return (
        <TouchableHighlight style={[styles.container, {backgroundColor}]} underlayColor='transparent'>
            <View style={styles.circle}>
                <Text style={[styles.text, {color: fontColor}]}>{text}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 50,
        height: 50,
        overflow: 'hidden',
        marginRight: 5,
    },
    circle: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
    },
});

export default CircleBox;
