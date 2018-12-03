import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import * as Expo from 'expo';
import { createUser, getNewToken } from '../utils/firebase/UserUtils';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);
    this.createNewUser = this.createNewUser.bind(this);
    this.state = {
      loading: false
    }
  }

  private async createNewUser() {
    this.setState({loading: true});
    const name = this.props.navigation.getParam('name', 'user');
    let userInfoObject = await signInWithGoogleAsync();
    //console.log("Info object: ", userInfoObject)
    let userCalendarId = await getUserCalendarInfo(userInfoObject.accessToken);
    //console.log("User calendar id: ", userCalendarId)
    let userId = await createUser(name, userInfoObject, userCalendarId[0]);
    let token = await getNewToken(userId);

    await Expo.SecureStore.setItemAsync('localUserID', userId.toString());
    console.log("New user id in firebase: ", userId.toString())
    this.props.navigation.navigate('GroupListScreen');
  };

  render() {
    const name = this.props.navigation.getParam('name', 'user');

    let textOrLoading =
    <Text style={styles.intro}>
      Thanks, {name}! Let's get your calendar info from Google.
    </Text>;

    if(this.state.loading) {
      textOrLoading = <ActivityIndicator size='large'/>
    }

    return (
      <ButtonScreenTemplate
        bottomButtonFunction={this.state.loading ? ()=>{} : this.createNewUser}
        bottomButtonText={this.state.loading ? 'Loading' : 'Login with Google'}
        darkBackground={true}
      >
        {textOrLoading}
      </ButtonScreenTemplate>
    );
  }
}

// Example of using the Google REST API
/**
 * Internal asynchronous function that attempts to fetch a user's list of calendars via Google REST API.
 * @param accessToken the access token generated by a Google Sign-In
 * @return The response of the Google Calendar GET request and Google Calendar  executed in this function.
 */
export async function getUserCalendarInfo(accessToken) {
  console.log("getUserCalendarInfo: Fetching")
  let idArray = [];
  console.log(accessToken);
  await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
  })
  .then(response => {
    return response.json();
  })
  .then (responseJSON => {
    console.log(responseJSON);
    console.log(responseJSON.items);
    responseJSON.items.forEach(function(element) {
      console.log(element.id);
      idArray.push(element.id);
    });
  });
  console.log("this is a calendar id" + idArray);
  return idArray;
}
/**
 * Internal asynchronous function that attempts to fetch a user's events on the first calendar via Google REST API.
 * @param accessToken the access token generated by a Google Sign-In
 * @return The response of the Google Calendar GET request and Google Calendar executed in this function.
 */
async function getUserInfo(accessToken) {
  console.log("(getUserInfo: Fetching")
  let idArray = [];
  console.log(accessToken);
  await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
  })
  .then(response => {
    return response.json();
  })
  .then (responseJSON => {
    console.log(responseJSON);
    console.log(responseJSON.items);
    responseJSON.items.forEach(function(element) {
      console.log(element.id);
      idArray.push(element.id);
    });
  });
  console.log("this is a calendar id" + idArray);
  let eventStartTimes = [];
  await fetch('https://www.googleapis.com/calendar/v3/calendars/' + idArray[1] + '/events', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`
  }
  })
  .then(response => {
    return response.json();
  })
  .then (responseJSON => {
    responseJSON.items.forEach(function(element) {
      console.log(element.start.dateTime);
      eventStartTimes.push(element.start.dateTime);
    });
    return eventStartTimes;
  });

  return eventStartTimes;
}

function testFirebaseSetup() {
  createUser("poop");
  getUsersGroups("8VmsTMtMJjGOdChQILfz");
}

/**
 * Internal asynchronous function that attempts to sign-in to Google via OAuth.
 * @param None
 * @return User Account Info JSON object
 */
export async function signInWithGoogleAsync() {
  try {
    console.log("entering result get");
    const result = await Expo.Google.logInAsync({
      androidClientId: "9082209040-2um3lmf7kfh1enpabk5o6igiump72ppi.apps.googleusercontent.com",
      iosClientId: "9082209040-hlvr3h8uc9e8buaej5mphgv4lmvihpuf.apps.googleusercontent.com",
      behavior: "web",
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    });
    console.log("result type", result.type);

    if (result.type === 'success') {
      console.log(result)
      console.log("ACCESS TOKEN" + result.accessToken)
      //let response = getUserInfo(result.accessToken)

      return result;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }
}

const styles = StyleSheet.create({
  intro: {
    fontSize: GlobalStyles.fontSize.large.fontSize,
    fontFamily: GlobalStyles.fontFamily.primaryFontBold.fontFamily,
    color: GlobalStyles.textColor.white.color
  }
});

export default SignInScreen
