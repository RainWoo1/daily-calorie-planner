import { StyleSheet, Text, View } from 'react-native';
import OvalBox from './ovalbox';

const InfoPage2 = () => {
	return (
        <View>
            <Text style={styles.titleContainer}>Any ingredient allergies?</Text>
            <Text style={styles.subTitleContainer}>To offer you the best tailored diet experience we need to know more information about you.</Text>
            {/* <View style={styles.ovalContainer}>
                <OvalBox text='Gluten'/>
                <OvalBox text='Diary'/>
                <OvalBox text='Egg'/>
                <OvalBox text='Soy'/>3
                <OvalBox text='Peanut'/>
                <OvalBox text='Wheat'/>
                <OvalBox text='Milk'/>
                <OvalBox text='Fish'/>
            </View> */}
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

export default InfoPage2;
