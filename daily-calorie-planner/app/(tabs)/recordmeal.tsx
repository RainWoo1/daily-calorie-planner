import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const App = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');




    // const [recording, setRecording] = useState();
    // const [isRecording, setIsRecording] = useState(false);
    // const [audioUri, setAudioUri] = useState(null);
    const [sentence, setSentence] = useState('');
    const [foods, setFoods] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);

    // const startRecording = async () => {
    //     try {
    //         const { status } = await Audio.requestPermissionsAsync();
    //         if (status !== 'granted') {
    //             Alert.alert('Permission to access microphone is required!');
    //             return;
    //         }

    //         const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    //         setRecording(recording);
    //         setIsRecording(true);
    //     }
    //     catch (error) {
    //         console.error('Failed to start recording', error);
    //     }
    // };
    
    // const stopRecording = async () => {
    //     setIsRecording(false);
    //     try {
    //         await recording.stopAndUnloadAsync();
    //         const uri = recording.getURI();
    //         setAudioUri(uri);
    //         uploadAudio(uri);
    //     }
    //     catch (error) {
    //         console.error('Failed to stop recording', error);
    //     }
    // };

    // const uploadAudio = async (uri) => {
    //     const formData = new FormData();
    //     formData.append('audio_data', {
    //         uri: uri,
    //         type: 'audio/webm',
    //         name: 'audio.webm',
    //     });

    //     try {
    //         const response = await fetch('http://your-backend-api/upload', {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         const data = await response.text();
    //         const splitData = data.split(';;');
    //         setSentence(splitData[0]);
    //         setFoods(splitData[1].split(';'));
    //         setTotalCalories(splitData[2]);
    //     }
    //     catch (error) {
    //         console.error('Error uploading file:', error);
    //     }
    // };
















    const handleSendText = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText }),
            });

            const data = await response.json();
            setOutputText(data.output);
        }
        catch (error) {
            console.error('Error sending text:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Enter text"
            />
            <Button title="Send" onPress={handleSendText} />
            {outputText ? <Text style={styles.output}>{outputText}</Text> : null}
            {/* <Button
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
                onPress={isRecording ? stopRecording : startRecording}
                color={isRecording ? '#ef2929' : '#007bff'}
            /> */}
            {/* <Text style={styles.text}>Sentence: {sentence}</Text>
            {foods.map((food, index) => (
                <Text key={index} style={styles.text}>{food}</Text>
            ))}
            <Text style={styles.text}>Total Calories: {totalCalories}</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    output: {
        marginTop: 20,
        fontSize: 16,
    },
    text: {
        fontSize: 18,
        margin: 10,
    },
});

export default App;
