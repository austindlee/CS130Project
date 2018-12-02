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
      var bodyInfo = {
        "timeMin": new Date('26 December 2018 12:00').toISOString(),
        "timeMax": new Date('28 December 2018 12:00').toISOString(),
        "timeZone": "PST",
        "items": [
          {
            "id": "mg19oal80o3qbvi9a32alu2dtg@group.calendar.google.com"
          }
        ]
      }
      console.log(bodyInfo.items[0].id);
      let busyResponse = await findFreeTime(JSON.stringify(bodyInfo));
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
async function findFreeTime(bodyInfo) {
  console.log("in findfreetime");
  await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: bodyInfo
  }).then( response => {
    return response.json();
  }).then( responseJSON => {
    console.log(responseJSON);
  })


}


const styles = StyleSheet.create({
    intro: {
      fontSize: GlobalStyles.fontSize.large.fontSize,
      fontFamily: GlobalStyles.fontFamily.primaryFontBold.fontFamily,
      color: GlobalStyles.textColor.white.color,
    },
  });


export default FindTimeScreen