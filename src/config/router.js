import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';

const RootNavigator = StackNavigator({
    LoginScreen: {
        screen: LoginScreen
    },
    MainScreen: {
        screen: MainScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Public repositories',
            //headerLeft: <LeftDrawerButton {...navigation} />
        }),
    },
}, {
   initialRouteName: 'MainScreen',
   headerMode: 'none',
});

export default RootNavigator;