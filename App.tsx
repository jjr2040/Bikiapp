/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './app/redux/configureStore'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import LoginRegisterRoute from './app/routes/LoginRegister.route'
import HomeTabBarRoute from './app/routes/HomeTabBar.route'
import { PersistGate } from 'redux-persist/integration/react'
import { activateFirebase } from './app/config/FBRemoteConfig'
import { StyleProvider, Root } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

activateFirebase();

const RooStack = createStackNavigator({
  HomeTabBar: HomeTabBarRoute,
  LoginRegister: LoginRegisterRoute
}, {
  mode: 'modal',
  headerMode: 'none'
})

const AppContainer = createAppContainer(RooStack);

interface Props {}
export default class App extends Component<Props> {
  render() {
    const { store, persistor } = configureStore();
    // persistor.purge();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StyleProvider style={getTheme(platform)}>
            <Root>
             <AppContainer />
            </Root>   
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}