import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import * as Expo from 'expo';
import { getGroupInfo } from '../utils/firebase/GroupsUtils';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';
import { start } from 'repl';

class FindTimeScreen extends React.Component {

    constructor(props: any) {
        super(props);
        this.suggestTime = this.suggestTime.bind(this);
        this.findFreeTime = this.findFreeTime.bind(this);
        this.state = {
          text: '',
          isLoading: false
        }
      }

    private async suggestTime() {
      // let groupInfo = await getGroupInfo(groupID);
      // let calendarList = groupInfo.calendarIDs;
      let queryInfo = this.props.navigation.state.params;
      // let processedQueryInfo = parseInfo(queryInfo);
      console.log("entering result get");

      const result = await Expo.Google.logInAsync({
        androidClientId: "9082209040-2um3lmf7kfh1enpabk5o6igiump72ppi.apps.googleusercontent.com",
        iosClientId: "9082209040-hlvr3h8uc9e8buaej5mphgv4lmvihpuf.apps.googleusercontent.com",
        behavior: "web",
        scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
      });
      console.log("result type", result.type);
  
      var bodyInfo = {
        "timeMin": "2018-11-26T01:30:50.52Z",
        "timeMax": "2018-11-27T01:30:50.52Z",
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

      if (result.type === 'success') {
        console.log(result)
        console.log("ACCESS TOKEN" + result.accessToken)

        // for (var calendar in calendarList) {



        //   let tempTimes = await this.findFreeTime(JSON.stringify(bodyInfo), result.accessToken);

        // }
  
        let busyResponse = await this.findFreeTime(JSON.stringify(bodyInfo), result.accessToken);
      }
      // this.props.navigation.navigate('GroupListScreen');
    };



    //takes in the Timerange prop
private async findFreeTime(bodyInfo, accessToken) {
  //TODO: need groupID 
  let queryInfo = this.props.navigation.state.params;
  console.log(queryInfo.timeOfDay.toString());
  let timeOfDay = {
    "0": "T6:00:00.00Z",
    "1": "T12:00:00.00Z",
    "2": "T18:00:00.00Z",
    "3": "T00:00:00.00Z"
  }
  console.log(timeOfDay[queryInfo.timeOfDay.toString()]);
  let parsedInfo = await this.parseInfo(queryInfo);
  try {
    console.log(parsedInfo.startTime);
    console.log(parsedInfo.endTime);
      console.log(queryInfo.groupName);
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

private async parseInfo(queryInfo) {
  let interval = queryInfo.hours
  let timeOfDay = {
    "0": "T6:00:00.00Z",
    "1": "T12:00:00.00Z",
    "2": "T18:00:00.00Z",
    "3": "T00:00:00.00Z"
  }
  let startIntervalDT = (queryInfo.earliestDate + timeOfDay[queryInfo.timeOfDay.toString()]);

  function addHours(date, hours) {
    return new Date(date.getTime() + hours*3600000);
  }

  let endIntervalDT = addHours((new Date(startIntervalDT)), 6);
  console.log(endIntervalDT);
  console.log(startIntervalDT);
  // endIntervalDT = startIntervalDT.setHours(startIntervalDT.getHours()+6)
  // console.log(endIntervalDT);
  let parsedreturn = {
    groupName: queryInfo.groupName, 
    startTime: startIntervalDT,
    endTime: endIntervalDT,
    earliestDate: queryInfo.earliestDate,
    latestDate: queryInfo.latestDate
  } 
  return parsedreturn;
}

    render() {
      let queryInfo = this.props.navigation.state.params;
        return (
          <ButtonScreenTemplate
            bottomButtonText='Get free/busy info'
            darkBackground={true}
            bottomButtonFunction={this.suggestTime}
          >
          <Text>
          {queryInfo.groupName}
          </Text>
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


export default FindTimeScreen