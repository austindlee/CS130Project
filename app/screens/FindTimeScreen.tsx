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
      let parsedInfo = await this.parseInfo(queryInfo);
      // let processedQueryInfo = parseInfo(queryInfo);
      console.log("entering result get");

      const result = await Expo.Google.logInAsync({
        androidClientId: "9082209040-2um3lmf7kfh1enpabk5o6igiump72ppi.apps.googleusercontent.com",
        iosClientId: "9082209040-hlvr3h8uc9e8buaej5mphgv4lmvihpuf.apps.googleusercontent.com",
        behavior: "web",
        scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
      });
      console.log("result type", result.type);

      //NEED TO GET THIS FROM GROUPLIST onclick props
      let groupData = await getGroupInfo("115368707");
      console.log("this is the group doc.data()" + groupData);
      let calendarIDs = groupData.calendarIDs;
      console.log(calendarIDs);

      //take out null calendar entries
      for(var index in calendarIDs) {
        if(calendarIDs[index] == null) {
          calendarIDs.splice(index, 1);
        }
      }
      let tempIDArray = []
      for(var index in calendarIDs) {
        let tempIDObject = {};
        tempIDObject["id"] = calendarIDs[index];
        tempIDArray.push(tempIDObject);
        console.log("tempIDArray is " + tempIDArray)
      }
  
      console.log("start time is" + parsedInfo.startTime + ", end time is " + parsedInfo.endTime.toISOString());
      var bodyInfo = {
        "timeMin": parsedInfo.startTime,
        "timeMax": parsedInfo.endTime.toISOString(),
        "timeZone": "America/Los Angeles",
        "items": tempIDArray
      }

      if (result.type === 'success') {
        console.log(result)
        console.log("ACCESS TOKEN" + result.accessToken)

        // while(bodyInfo.timeMin.getDate() != queryInfo.latestDate.getDate()) {
        // }



          let tempTimes = await this.findFreeTime(bodyInfo, result.accessToken);
          console.log("tempTimes: ", tempTimes);

        }
  
        // let busyResponse = await this.findFreeTime(JSON.stringify(bodyInfo), result.accessToken);
      // this.props.navigation.navigate('GroupListScreen');
    };



    //takes in the Timerange prop
private async findFreeTime(bodyInfo, accessToken) {
  //TODO: need groupID 
  console.log("this is bodyinfo" + bodyInfo);
  console.log( "this is bodyinfo items " + bodyInfo.items)
  let queryInfo = this.props.navigation.state.params;
  console.log(queryInfo.timeOfDay.toString());
  let timeOfDay = {
    "0": "T14:00:00.000Z",
    "1": "T20:00:00.000Z",
    "2": "T02:00:00.000Z",
    "3": "T08:00:00.000Z"
  }
  console.log(timeOfDay[queryInfo.timeOfDay.toString()]);
  let parsedInfo = await this.parseInfo(queryInfo);

  console.log("this is still bodyinfo" + bodyInfo.items)
  try {
    console.log(parsedInfo.startTime);
    console.log(parsedInfo.endTime);
    console.log(queryInfo.groupName);
    console.log("in findfreetime");
    console.log("calendars we're looking at " + bodyInfo.items);
      await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(bodyInfo)
      }).then( response => {
        return response.json();
      }).then( responseJSON => {
        console.log("responseJSON is " + JSON.stringify(responseJSON, null, 4));
        console.log("calendars found are " + responseJSON.calendars);
        let calendars = responseJSON.calendars;
        for(var calendar in responseJSON.calendars) {
          if(responseJSON.calendars.hasOwnProperty(calendar)) {
            console.log(calendar + "->" + responseJSON.calendars[calendar].busy);
            for (var event in responseJSON.calendars[calendar].busy) {
               console.log(responseJSON.calendars[calendar].busy[event].end + "and the start is " + responseJSON.calendars[calendar].busy[event].start);
            }
          }
        }
        return responseJSON;
      })
  } catch(e) {
    console.log(e);
    return {error: true};
  }
}

private async parseInfo(queryInfo) {
  console.log("in parseinfo");
  let interval = queryInfo.hours
  let timeOfDay = {
    "0": "T14:00:00.000Z",
    "1": "T20:00:00.000Z",
    "2": "T02:00:00.000Z",
    "3": "T08:00:00.000Z"
  }
  let startIntervalDT = (queryInfo.earliestDate + timeOfDay[queryInfo.timeOfDay.toString()]);

  function addHours(date, hours) {
    return new Date(date.getTime() + hours*3600000);
  }

  let endIntervalDT = addHours((new Date(startIntervalDT)), 6);
  console.log("typeof endinterval is " + typeof endIntervalDT)
  console.log(endIntervalDT);
  console.log("this is 'timemax' " + endIntervalDT);
  console.log("this is 'timemin' " + startIntervalDT);

  let parsedreturn = {
    groupName: queryInfo.groupName, 
    startTime: startIntervalDT,
    endTime: endIntervalDT,
    earliestDate: queryInfo.earliestDate,
    latestDate: queryInfo.latestDate
  } 
  console.log(parsedreturn.latestDate);
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