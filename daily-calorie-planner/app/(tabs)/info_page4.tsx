import { StyleSheet, Text, View } from 'react-native';

const InfoPage4 = () => {
	return (
        <View>
            <Text style={styles.titleContainer}>Do you follow any of these diets?</Text>
            <Text style={styles.subTitleContainer}>To offer you the best tailored diet experience we need to know more information about you.</Text>
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
});

export default InfoPage4;
