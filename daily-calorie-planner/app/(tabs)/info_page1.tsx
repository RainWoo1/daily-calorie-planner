import { StyleSheet, Text, View } from 'react-native';

const InfoPage1 = () => {
	return (
        <View>
            <Text style={styles.titleContainer}>Tell us about yourself!</Text>
			<Text style={styles.subTitleContainer}>To offer you the best tailored diet experience we need to know more information about you.</Text>
			<Text style={styles.subTitleContainer}>Enter your age:</Text>
			<Text style={styles.subTitleContainer}>Enter your gender:</Text>
			<Text style={styles.subTitleContainer}>Enter your height:</Text>
			<Text style={styles.subTitleContainer}>Enter your weight:</Text>
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
	subTitleContainer: {
		fontSize: 20,
	},
    ovalContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default InfoPage1;
