import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Card, Avatar, Divider } from "react-native-elements";
import PropTypes from 'prop-types';
import { strings } from '../locales/i18n';
import styles from '../styles/styles';
import Hyperlink from 'react-native-hyperlink'

export default class RepositoriesList extends React.Component {
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {store} = this.context;
        const state = store.getState();
        console.log(state);
        return (
            <Card title={strings('main.repositories_list_title')}
                containerStyle={[{flex: 1, marginTop: 0}, styles.cardContainer]}
                wrapperStyle={{flex: 1}}
                titleStyle={styles.cardTitle}
                dividerStyle={styles.divider}>
                {state.repos.isLoading ? (
                    <ActivityIndicator style={{flex: 1}} size="large" />
                ):(
                    <FlatList data={state.repos.items}
                         keyExtractor={(item) => item.id}
                         renderItem={({item}) =>
                            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                                <Avatar source={item.avatar} medium />
                                <View style={{flex: 1, paddingStart: 10}}>
                                    <Text style={{fontSize: 16,fontWeight: 'bold'}}>{item.name}</Text>
                                    <Text style={{fontSize: 14, color: '#b2b2b2'}}>{item.description}</Text>
                                    <Hyperlink linkDefault={true} linkStyle={{color:'#2296F3'}}>
                                        <Text>{item.url}</Text>
                                    </Hyperlink>
                                </View>
                            </View>}
                    />
                )}
            </Card>
        );
    }
}

RepositoriesList.contextTypes = {
    store: PropTypes.object
};