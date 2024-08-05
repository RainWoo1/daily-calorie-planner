import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InfoPage1 from './info_page1';
import InfoPage2 from './info_page2';
import InfoPage3 from './info_page3';
import InfoPage4 from './info_page4';
import CircleBox from './circlebox';
import SquareBox from './squarebox'

const InfoPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const pages = [<InfoPage1/>, <InfoPage2/>, <InfoPage3/>, <InfoPage4/>];

    const handlePreviousPress = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + pages.length) % pages.length);
    };
    const handleNextPress = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
    };
	return (
        <View style={styles.container}>
            <View style={styles.circleContainer}>
                <CircleBox text={1} state={currentPage}/>
                <CircleBox text={2} state={currentPage}/>
                <CircleBox text={3} state={currentPage}/>
                <CircleBox text={4} state={currentPage}/>
                <Text style={styles.skipContainer}>Skip</Text>
            </View>
            {pages[currentPage]}
            <View style={styles.squareContainer}>
                <SquareBox text='Previous' onPress={handlePreviousPress}/>
                <SquareBox text='Next' onPress = {handleNextPress}/>
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
    squareContainer: {
        marginTop: 30,
        flexDirection: 'row',
    }
});

export default InfoPage;
