import React from 'react';
import RootNavigator from './config/router';
import { Provider } from 'react-redux';
import { View, Text, ActivityIndicator } from 'react-native';
import store from './config/store'

class App extends React.Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
            this.unsubscribe();
        });
    }
    render() {
        const state = store.getState();
        return (
            <Provider store={store}>
                {state.store.loaded? (
                    <RootNavigator />
                ) : (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" />
                        <Text>Load state...</Text>
                    </View>
                )}

            </Provider>
        );
    }
}

export default App;