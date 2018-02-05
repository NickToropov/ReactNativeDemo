import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Button
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { Card, FormLabel, FormInput,Avatar } from "react-native-elements";
import PropTypes from 'prop-types';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { strings } from '../locales/i18n';
import styles from '../styles/styles';

var base64 = require('base-64');

export default class LoginScreen extends React.Component {

    _form = {email: 'd3fupc26mxdp@inbox.ru', pwd:'1q2w3e4r'};

    constructor(props) {
        super(props);
        this.resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'MainScreen'})
                ]
            });
    }

    _logIn() {
        const token = base64.encode(this._form.email + ':' + this._form.pwd);
        const {store} = this.context;
        store.dispatch({type: 'LOGGING'});
        fetch('https://api.github.com/user', {
            method: 'GET',
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: 'Basic ' + token,
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
            .then((user) => {
                store.dispatch({type: 'LOGIN', token, id: user.id, name: user.name, avatar_url: user.avatar_url});
                this.props.navigation.dispatch(this.resetAction)
            })
            .catch((err) => {
                store.dispatch({type: 'LOGIN', token:'', id: '', name: '', avatar_url: ''});
                Alert.alert(err.message);
            });
    }

    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { navigate } = this.props.navigation;
        const {store} = this.context;
        const state = store.getState();

        return (

            <View style={{flex:1, justifyContent: 'center',}}>
                <Card title={strings('login.title')}
                    containerStyle={{borderRadius: 5}}
                    titleStyle={styles.cardTitle}
                    dividerStyle={styles.divider} >

                    <TextInput placeholder={strings('login.email_placeholder')} onChangeText={(val) => this._form.email = val} />
                    <TextInput secureTextEntry placeholder={strings('login.pwd_placeholder')} onChangeText={(val) => this._form.pwd = val} />
                    {state.auth.isLogging ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <View style={{alignSelf: 'flex-end'}} >
                            <Button
                                title={strings('login.login_button')}
                                onPress={() => {this._logIn();}} />
                        </View>
                    )}
                </Card>
            </View>
        );
    }
}

LoginScreen.contextTypes = {
    store: PropTypes.object
};