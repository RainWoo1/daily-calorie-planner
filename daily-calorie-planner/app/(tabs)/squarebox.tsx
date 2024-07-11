import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';

interface SquareBoxProps {
    text: string;
}

const SquareBox: React.FC<SquareBoxProps> = ({ text }) => {
    const [isHighlighted, setIsHighlighted] = useState(false);

    const handlePress = () => {
        setIsHighlighted(!isHighlighted);
    };

    return (
        <TouchableHighlight
        style={[styles.container, isHighlighted && styles.highlighted]}
        onPress={handlePress}
        underlayColor="transparent"
        >
        <View style={styles.square}>
            <Text style={styles.text}>{text}</Text>
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
