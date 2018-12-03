import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import * as Expo from 'expo';
import { createUser, getNewToken } from '../utils/firebase/UserUtils';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';

class AddEventToCalendarScreen extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {text: ''};
    }

    private async test() {
        var event = {
            'summary': 'Google I/O 2015',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
                'dateTime': '2015-05-28T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': '2015-05-28T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
                {'email': 'lpage@example.com'},
                {'email': 'sbrin@example.com'},
                {'email': 'bensonhan@g.ucla.edu'}
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
                ]
            }
        };
    
        const result = await Expo.Google.logInAsync({
          androidClientId: "9082209040-2um3lmf7kfh1enpabk5o6igiump72ppi.apps.googleusercontent.com",
          iosClientId: "9082209040-hlvr3h8uc9e8buaej5mphgv4lmvihpuf.apps.googleusercontent.com",
          behavior: "web",
          scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
        });
    
        if (result.type == 'success') {
          this.createEvent("bensonjaminhan@gmail.com", result.accessToken, event['summary'], event['end'], event['start'], event['attendees']);
        }
      }
    
      private async createEvent(calendarID, accessToken, summary, end, start, attendees) {
        let requestBody = {
            "summary": summary,
            "end": end,
            "start": start,
            "attendees": attendees
        };
        let requestBodyJSON = JSON.stringify(requestBody);
        console.log("hello");
        await fetch('https://www.googleapis.com/calendar/v3/calendars/' + calendarID + '/events', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
                sendUpdates: 'all'
            },
            body: requestBodyJSON
        })
      }
    
    render() {
        return (
          <ButtonScreenTemplate
            bottomButtonText='Get free/busy info'
            darkBackground={true}
            bottomButtonFunction={this.test}
          >
          </ButtonScreenTemplate>
        );
    } 
}

const styles = StyleSheet.create({
    intro: {
      fontSize: GlobalStyles.fontSize.large.fontSize,
      fontFamily: GlobalStyles.fontFamily.primaryFontBold.fontFamily,
      color: GlobalStyles.textColor.white.color,
    },
  });


export default AddEventToCalendarScreen