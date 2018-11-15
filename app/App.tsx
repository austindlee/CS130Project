import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import BottomButton from './components/BottomButton';
import DevScreen from './screens/DevScreen';
import { createStackNavigator } from 'react-navigation';
import ComponentPlaygroundScreen from './screens/ComponentPlaygroundScreen';
import firebase from 'firebase';
import 'firebase/firestore';

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
