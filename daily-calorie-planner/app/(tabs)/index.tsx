import { StyleSheet, Text, View } from 'react-native';
import CircleBox from './circlebox';
import OvalBox from './ovalbox';
import SquareBox from './squarebox'

export default function HomeScreen() {
	return (
        <View style={styles.container}>
            <View style={styles.circleContainer}>
                <CircleBox text='1' state='past'/>
                <CircleBox text='2' state='present'/>
                <CircleBox text='3' state='future'/>
                <CircleBox text='4' state='future'/>
                <Text style={styles.skipContainer}>Skip</Text>
            </View>
            <Text style={styles.titleContainer}>Any ingredient allergies?</Text>
            <Text style={styles.subTitleContainer}>To offer you the best tailored diet experience we need to know more information about you.</Text>
            <View style={styles.ovalContainer}>
                <OvalBox text='Gluten'/>
                <OvalBox text='Diary'/>
                <OvalBox text='Egg'/>
                <OvalBox text='Soy'/>
                <OvalBox text='Peanut'/>
                <OvalBox text='Wheat'/>
                <OvalBox text='Milk'/>
                <OvalBox text='Fish'/>
            </View>
            <View style={styles.squareContainer}>
                <SquareBox text='Previous'/>
                <SquareBox text='Next'/>
            </View>
        </View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 80,
		paddingLeft: 20,
		paddingRight: 100,
        backgroundColor: '#FFFFFF'
  	},
    circleContainer : {
        flexDirection: 'row',
    },
    skipContainer : {
        fontSize: 15,
        marginTop: 15,
        marginLeft: 80,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1F73F1',
        fontWeight: 'bold',
    },
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
    squareContainer: {
        marginTop: 30,
        flexDirection: 'row',
    }
});
