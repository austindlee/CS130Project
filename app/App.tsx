import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import BottomButton from './components/BottomButton';
import { Font } from 'expo';
import DevScreen from './screens/DevScreen';
import { createStackNavigator } from 'react-navigation';
import ComponentPlaygroundScreen from './screens/ComponentPlaygroundScreen';
import HomeScreen from './screens/HomeScreen';
import GroupListScreen from './screens/GroupListScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import JoinGroupScreen from './screens/JoinGroupScreen';

const RootStack = createStackNavigator(
  {
    Development: DevScreen,
    ComponentPlayground: ComponentPlaygroundScreen,
    HomeScreen: HomeScreen,
    GroupListScreen: GroupListScreen,
    CreateGroupScreen: CreateGroupScreen,
    JoinGroupScreen: JoinGroupScreen
  },
  {
    initialRouteName: 'Development'
  }
);

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'karla-regular': require('./assets/fonts/Karla-Regular.ttf'),
      'karla-bold': require('./assets/fonts/Karla-Bold.ttf')
    });
  }
  render() {
    return (
      <RootStack/>
    );
  }
}
