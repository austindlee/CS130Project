import React from 'react';
import { Alert, StyleSheet, Text, Platform, View } from 'react-native';
import BottomButton from './components/BottomButton';
import * as Expo from 'expo';
import { Font } from 'expo';
import DevScreen from './screens/DevScreen';
import { createStackNavigator } from 'react-navigation';
import StartScreen from './screens/StartScreen';
import firebase from 'firebase';
import 'firebase/firestore';
import HomeScreen from './screens/HomeScreen';
import GroupListScreen from './screens/GroupListScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import JoinGroupScreen from './screens/JoinGroupScreen';
import NameScreen from './screens/NameScreen';
import SignInScreen from './screens/SignInScreen';
import ShareGroupScreen from './screens/ShareGroupScreen';
import FindTimeScreen from './screens/FindTimeScreen';
import GroupScreen from './screens/GroupScreen';
import EventCreationTimeScreen from './screens/EventCreationTimeScreen';
import EventCreationDateRangeScreen from './screens/EventCreationDateRangeScreen';
import EventCreationOptionsScreen from './screens/EventCreationOptionsScreen';
import LeaveGroupScreen from './screens/LeaveGroupScreen';
import ConfirmLeftGroupScreen from './screens/ConfirmLeftGroupScreen';
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
    StartScreen: StartScreen,
    HomeScreen: HomeScreen,
    GroupListScreen: GroupListScreen,
    CreateGroupScreen: CreateGroupScreen,
    JoinGroupScreen: JoinGroupScreen,
    NameScreen: NameScreen,
    SignInScreen: SignInScreen,
    ShareGroupScreen: ShareGroupScreen,
    FindTimeScreen: FindTimeScreen,
    GroupScreen: GroupScreen,
    EventCreationTimeScreen: EventCreationTimeScreen,
    EventCreationDateRangeScreen: EventCreationDateRangeScreen,
    EventCreationOptionsScreen: EventCreationOptionsScreen,
    LeaveGroupScreen: LeaveGroupScreen,
    ConfirmLeftGroupScreen: ConfirmLeftGroupScreen,
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
    if (Platform.OS === 'android') {
      Expo.Notifications.createChannelAndroidAsync('chat-messages', {
        name: 'Chat messages',
        sound: true,
      });
    }
  }
  render() {
    return (
      <RootStack/>
    );
  }
}
