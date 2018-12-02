import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import * as Expo from 'expo';
import { createUser, getNewToken } from '../utils/firebase/UserUtils';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';

class FindTimeScreen extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {text: ''};
      }

    private async suggestTime() {
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

        var bodyInfo = {
          "timeMin": new Date('26 December 2018 12:00').toISOString(),
          "timeMax": new Date('28 December 2018 12:00').toISOString(),
          "timeZone": "PST",
          "items": [
            {
              "id": "planit.test.ucla@gmail.com"
            },
            {
              "id": "aperson707@gmail.com"
            }
          ]
        }
        console.log(bodyInfo.items[0].id);
  
        let busyResponse = await findFreeTime(JSON.stringify(bodyInfo), result.accessToken);
      }
      // this.props.navigation.navigate('GroupListScreen');
    };

    render() {
        return (
          <ButtonScreenTemplate
            bottomButtonText='Get free/busy info'
            darkBackground={true}
            bottomButtonFunction={this.suggestTime}
          >
          </ButtonScreenTemplate>
        );
      } 
}

//takes in the Timerange prop
async function findFreeTime(bodyInfo, accessToken) {
  try {
    let queryInfo = this.props.navigation.state.params
    //TEST if requires google login; does not
      console.log("in findfreetime");
      await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: bodyInfo
      }).then( response => {
        return response.json();
      }).then( responseJSON => {
        console.log(responseJSON);
        let calendars = responseJSON.calendars;
        for(var calendar in responseJSON.calendars) {
  
          if(responseJSON.calendars.hasOwnProperty(calendar)) {
            console.log(calendar + "->" + responseJSON.calendars[calendar].busy);
            for (var event in responseJSON.calendars[calendar].busy) {
               console.log(responseJSON.calendars[calendar].busy[event].end + "and the start is " + responseJSON.calendars[calendar].busy[event].start);
            }
          }
        }
      })
  } catch(e) {
    return {error: true};
  }
}



const styles = StyleSheet.create({
    intro: {
      fontSize: GlobalStyles.fontSize.large.fontSize,
      fontFamily: GlobalStyles.fontFamily.primaryFontBold.fontFamily,
      color: GlobalStyles.textColor.white.color,
    },
  });


export default FindTimeScreen