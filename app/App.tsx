import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import BottomButton from './components/BottomButton';
import { Font } from 'expo';
import DevScreen from './screens/DevScreen';
import { createStackNavigator } from 'react-navigation';
import ComponentPlaygroundScreen from './screens/ComponentPlaygroundScreen';
import firebase from 'firebase';
import 'firebase/firestore';
import HomeScreen from './screens/HomeScreen';
import GroupListScreen from './screens/GroupListScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import JoinGroupScreen from './screens/JoinGroupScreen';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAi3jiRJKl472HN-w-r4p8adyy1lnhV7Ss",
  authDomain: "planit-7df53.firebaseapp.com",
  databaseURL: "https://planit-7df53.firebaseio.com",
  projectId: "planit-7df53",
  storageBucket: "planit-7df53.appspot.com",
  messagingSenderId: "365219979561"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

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
