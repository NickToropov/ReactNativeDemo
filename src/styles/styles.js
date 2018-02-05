import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 5,
        margin: 10,
        padding: 10,
        marginBottom:10,
    },
    cardTitle: {
        fontSize: 18,
    },
    divider: {
        backgroundColor:'#b2b2b2',
    },
    inputErrorMsg: {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 12
    }
});

export default styles;