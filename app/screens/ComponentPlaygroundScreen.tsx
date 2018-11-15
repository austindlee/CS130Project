import React from 'react';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import * as Expo from 'expo';
import BottomButton from '../components/BottomButton';
import GroupCard from '../components/GroupCard';
import { createStackNavigator } from 'react-navigation';

/** Test function passed in to a button */
function testAlert(): void {
  Alert.alert("The button was pressed");
}

class ComponentPlaygroundScreen extends React.Component {
  static navigationOptions = {
    title: 'PlanIt',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to PlanIt!
        </Text>
        <Text style={styles.instructions}>
          To get started, sign in with your Google account.
        </Text>
        <Button
          color="#841584"
          title="Sign In"
          onPress={() => {
            signInWithGoogleAsync();
            this.props.navigation.navigate('HomeScreen');
          }}
        />
      </View>
    );
  }
}

// Example of using the Google REST API
async function getUserInfo(accessToken) {
  console.log("Fetching")
  // let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
  //   headers: { Authorization: `Bearer ${accessToken}`},
  // });
  // console.log(userInfoResponse)
  console.log(accessToken);
  let calendarResponse = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
  });
  console.log("THIS IS THE CALENDAR RESPONSE " + JSON.stringify(calendarResponse))
  console.log(calendarResponse._bodytext)

  // return userInfoResponse;
  return calendarResponse;
}

async function signInWithGoogleAsync() {
  try {
    console.log("entering result get");
    const result = await Expo.Google.logInAsync({
      androidClientId: "9082209040-2um3lmf7kfh1enpabk5o6igiump72ppi.apps.googleusercontent.com",
      iosClientId: "9082209040-hlvr3h8uc9e8buaej5mphgv4lmvihpuf.apps.googleusercontent.com",
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    });
    console.log("result type", result.type);

    if (result.type === 'success') {
      console.log("was a success")
      console.log(result)
      console.log("ACCESS TOKEN" + result.accessToken)
      getUserInfo(result.accessToken)
      this.props.navigation.navigate('HomeScreen');
      return result.accessToken;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }
}

async function createNewUser() {
  // TO DO:
  // Once firebase is set up, create a unique memberID for each user and store
  // in firebase.
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
  },
});

export default ComponentPlaygroundScreen
