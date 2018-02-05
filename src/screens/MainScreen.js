import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Card, Avatar, Divider } from "react-native-elements";
import PropTypes from 'prop-types';
import RepositoriesList from '../components/RepositoriesList'
import { strings } from '../locales/i18n';
import styles from '../styles/styles';

export default class MainScreen extends React.Component {

    _loadData() {
        const {store} = this.context;
        const state = store.getState();
        store.dispatch({type: 'LOADING'});

        fetch('https://api.github.com/user/repos', {
            method: 'GET',
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: 'Basic ' + state.auth.token,
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then((r) => {
                const body = JSON.parse(r._bodyText);
                if (r.status !== 200) {
                    throw body;
                }
                return body;
            })
            .then((repos) => store.dispatch({type: 'LOADED', repos}))
            .catch((err) => {
                store.dispatch({type: 'LOADED', error: err});
                Alert.alert(err.message);
            });
    }

    componentDidMount() {
        const {store} = this.context;
        const state = store.getState();
        if (!state.auth.token) {
            this.props.navigation.navigate('LoginScreen')
        } else {
            this._loadData();
        }
    }

    render() {
        const {store} = this.context;
        const state = store.getState();
        const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'LoginScreen'})
                        ]
                    });
        return (
            <View style={{flex: 1, alignItems: 'center', alignItems: 'stretch'}}>
                <Card containerStyle={styles.cardContainer} wrapperStyle={{flexDirection: 'row'}}>
                    <Avatar source={{uri: state.auth.avatar_url}} large />
                    <Text style={{flex: 4, fontSize: 20, marginHorizontal: 10}}>{state.auth.name}</Text>
                    <View style={{alignSelf: 'flex-start'}}>
                    <Button title={strings('main.logout_button')}
                        onPress={() => {
                            store.dispatch({type: 'LOGOUT'});
                            this.props.navigation.dispatch(resetAction)
                        }} />
                        </View>
                </Card>
                <RepositoriesList />
            </View>
        );
    }
};


MainScreen.contextTypes = {
    store: PropTypes.object
};