import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import BottomButton from './components/BottomButton';
import DevScreen from './screens/DevScreen';
import { createStackNavigator } from 'react-navigation';
import ComponentPlaygroundScreen from './screens/ComponentPlaygroundScreen';

const RootStack = createStackNavigator(
  {
    Development: DevScreen,
    ComponentPlayground: ComponentPlaygroundScreen
  },
  {
    initialRouteName: 'Development'
  }
);

export default class App extends React.Component {
  render() {
    return (
      <RootStack/>
    );
  }
}

