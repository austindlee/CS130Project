import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import BottomButton from './components/BottomButton';
import DevScreen from './screens/DevScreen';
import { createStackNavigator } from 'react-navigation';
import ComponentPlaygroundScreen from './screens/ComponentPlaygroundScreen';
import GroupListScreen from './screens/GroupListScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import JoinGroupScreen from './screens/JoinGroupScreen';

const RootStack = createStackNavigator(
  {
    Development: DevScreen,
    ComponentPlayground: ComponentPlaygroundScreen,
    GroupListScreen: GroupListScreen,
    CreateGroupScreen: CreateGroupScreen,
    JoinGroupScreen: JoinGroupScreen
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

