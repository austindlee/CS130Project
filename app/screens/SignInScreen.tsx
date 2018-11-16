import React from 'react';
import { Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import BottomButton from '../components/BottomButton';
import { createStackNavigator } from 'react-navigation';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.intro}>
          Thanks! Let's get your calendar info from Google.
        </Text>
        <View style={styles.buttonActions}>
        <BottomButton
          buttonAction={() => {
            signInWithGoogleAsync();
            this.props.navigation.navigate('GroupListScreen');
          }}
          buttonText='Login With Google'
          buttonFilled={false}
        />
        </View>
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

function testFirebaseSetup() {
  createUser("poop");
  getUsersGroups("8VmsTMtMJjGOdChQILfz");
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
    backgroundColor: GlobalStyles.color.purple,
    alignItems: 'center',

  },
  intro: {
    fontSize: GlobalStyles.fontSize.large.fontSize,
    fontFamily: GlobalStyles.fontFamily.primaryFontBold.fontFamily,
    color: GlobalStyles.textColor.white.color,
    margin: 10,
  },
  buttonActions: {
    height: 130,
    alignSelf: 'stretch',
  },
});

export default SignInScreen
