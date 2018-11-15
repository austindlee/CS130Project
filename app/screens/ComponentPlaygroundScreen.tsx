import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import BottomButton from '../components/BottomButton';
import GroupCard from '../components/GroupCard';
import { createStackNavigator } from 'react-navigation';
import createUser from '../utils/firebase/UserUtils.tsx';

/** Test function passed in to a button */
function testAlert(): void {
  Alert.alert("The button was pressed");
}

class ComponentPlaygroundScreen extends React.Component {
  static navigationOptions = {
    title: 'Component Playground',
  };
  render() {
    return (
      <View style={styles.container}>
        <BottomButton
          buttonFilled={false}
          buttonText="hello"
          buttonAction={signInWithGoogleAsync}>
        </BottomButton>
        <BottomButton
          buttonFilled={true}
          buttonText="hello"
          buttonAction={testAlert}>
        </BottomButton>
        <BottomButton
          buttonFilled={true}
          buttonText="testAdd"
          buttonAction={testAdd}>
        </BottomButton>
        <GroupCard
          groupName='Test Group'

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

function testAdd() {
  createUser("poop");
}

async function signInWithGoogleAsync() {
  try {
    console.log("entering result get");
    const result = await Expo.Google.logInAsync({
      androidClientId: "9082209040-2um3lmf7kfh1enpabk5o6igiump72ppi.apps.googleusercontent.com",
      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    });

    if (result.type === 'success') {
      console.log("was a success")
      console.log(result)
      console.log("ACCESS TOKEN" + result.accessToken)
      getUserInfo(result.accessToken)
      return result.accessToken;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ComponentPlaygroundScreen
