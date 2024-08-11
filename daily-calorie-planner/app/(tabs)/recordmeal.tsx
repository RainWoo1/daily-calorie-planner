import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';

const App = () => {
    // const [inputText, setInputText] = useState('');
    // const [outputText, setOutputText] = useState('');

    // const handleSendText = async () => {
    //     try {
    //         const response = await fetch('http://127.0.0.1:5000/process', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ text: inputText }),
    //         });

    //         const data = await response.json();
    //         setOutputText(data.output);
    //     }
    //     catch (error) {
    //         console.error('Error sending text:', error);
    //     }
    // };

    // return (
    //     <View style={styles.container}>
    //         <TextInput
    //             style={styles.input}
    //             value={inputText}
    //             onChangeText={setInputText}
    //             placeholder="Enter text"
    //         />
    //         <Button title="Send" onPress={handleSendText} />
    //         {outputText ? <Text style={styles.output}>{outputText}</Text> : null}
    //     </View>
    // );

    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordingUri, setRecordingUri] = useState<string | null>(null);

    const startRecording = async () => {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();

            console.log('Setting audio mode..');
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                staysActiveInBackground: false,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
        }
        catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        console.log('Stopping recording..');
        recording?.stopAndUnloadAsync();
        const uri = recording?.getURI();
        setRecordingUri(uri);
        setRecording(null);
        console.log('Recording stopped and stored at', uri);
    };

    const sendRecording = async () => {
        if (recordingUri) {
            const formData = new FormData();
            formData.append('file', {
                uri: recordingUri,
                type: 'audio/m4a',
                name: 'test.m4a',
            });

            try {
                const response = await fetch('http://127.0.0.1:5000/uploadApp', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const data = await response.json();
                console.log('Upload Success:', data);
            }
            catch (error) {
                console.error('Upload Error:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Start Recording" onPress={startRecording} disabled={!!recording} />
            <Button title="Stop Recording" onPress={stopRecording} disabled={!recording} />
            <Button title="Send Recording" onPress={sendRecording} disabled={!recordingUri} />
            {recordingUri ? <Text>File path: {recordingUri}</Text> : null}
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
