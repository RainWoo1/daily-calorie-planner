import { StyleSheet, Text, View } from 'react-native';

const InfoPage3 = () => {
	return (
        <View>
            <Text style={styles.titleContainer}>Page 3</Text>
        </View>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
        marginTop: 20,
		fontSize: 25,
		fontWeight: 'bold',
		paddingBottom: 20,
	},
});

export default InfoPage3;
