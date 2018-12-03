import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import * as Expo from 'expo';
import { getGroupInfo, addEventToGroup } from '../utils/firebase/GroupsUtils';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';
import { start } from 'repl';
import { createEvent } from '../utils/local/AddEventToCalendar';
import { getNewToken } from '../utils/firebase/UserUtils';
import BottomButton from '../components/BottomButton';
import {convertDateToString} from '../utils/local/TimeConversion';
import {sendPush} from '../utils/local/PushNotifications';

 /* This screen houses the functional part of the app that finds
  * open timeslots to recommend times for events to take place 
  */
class FindTimeScreen extends React.Component {

    constructor(props: any) {
        super(props);
        this.suggestTime = this.suggestTime.bind(this);
        this.findFreeTime = this.findFreeTime.bind(this);
        this.state = {
          text: '',
          isLoading: false,
          freeTimeResult: [],
          accessToken:''
        }
      }

    /** suggestTime is the asynchronous entrypoint for findFreeTime. Before
      * entering findFreeTime, we parse the data available through Expo local
      * storage and the prop passed from the past screen, parsing it into a format
      * that we can easily use with the Google Calendar Freebusy API 
      */
    private async suggestTime() {
      // let groupInfo = await getGroupInfo(groupID);
      // let calendarList = groupInfo.calendarIDs;
      let queryInfo = this.props.navigation.state.params;
      let parsedInfo = await this.parseInfo(queryInfo);
      // let processedQueryInfo = parseInfo(queryInfo);
      console.log("entering result get");

      const userID = await Expo.SecureStore.getItemAsync('localUserID');
      console.log("THIS IS THE USERID" + userID);

      // let accessToken = await Expo.SecureStore.getItemAsync('localUserAccessToken');
      let accessToken = "1/CCs2p49ZrDogYkaHfDg1w-HvFmZ7mVE0g-cV3vVo88k";
      if (userID != null) {
        accessToken = await getNewToken(userID);
        console.log("THIS IS THE ACCESSTOKEN" + accessToken);
      }
      this.setState({accessToken: accessToken})

      // const result = await Expo.Google.logInAsync({
      //   androidClientId: "9082209040-2um3lmf7kfh1enpabk5o6igiump72ppi.apps.googleusercontent.com",
      //   iosClientId: "9082209040-hlvr3h8uc9e8buaej5mphgv4lmvihpuf.apps.googleusercontent.com",
      //   behavior: "web",
      //   scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
      // });
      // console.log("result type", result.type);

      //NEED TO GET THIS FROM GROUPLIST onclick props
      let groupData = await getGroupInfo(queryInfo.id);
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
      }

      console.log("start time is" + parsedInfo.startTime + ", end time is " + parsedInfo.endTime);
      var bodyInfo = {
        "timeMin": parsedInfo.startTime,
        "timeMax": parsedInfo.endTime,
        "timeZone": "America/Los Angeles",
        "items": tempIDArray
      }
      let validTimes = [];

      if (accessToken != null) {
        console.log()
        console.log("ACCESS TOKEN" + accessToken)

        console.log("starttimedate " + bodyInfo.timeMin);
        console.log("last date " + queryInfo.latestDate);
        console.log(bodyInfo.items)

        function addHours(date, hours) {
          return new Date(date.getTime() + hours*3600000);
        }
        function subHours(date, hours) {
          return new Date(date.getTime() - hours*3600000);
        }

        //start time is2018-12-02T20:00:00.00Z, end time is Sun Dec 02 2018 18:00:00 GMT-0800 (PST)
        var i = 0;
        var max_time = parsedInfo.endTime
        var end_time = subHours(parsedInfo.endTime, 5);
        console.log("entering loop")
        while (i < 6) {
          //6am - 12pm
          //startTime = 6am
          //endTime = 7am
          console.log("iter ", i)
          bodyInfo.timeMin = parsedInfo.startTime;
          bodyInfo.timeMax = end_time;

          console.log("MIN: ", bodyInfo.timeMin)
          console.log("MAX: ", bodyInfo.timeMax)

          // this.findFreeTime(JSON.stringify(bodyInfo), accessToken).then(response => {
          //   console.log("THIS IS THE RESPONSE: " + response);
          //   if(response) {
          //     console.log("PUSHING A VALID TIME");
          //     validTimes.push({"start": bodyInfo.timeMin.toString(), "end": bodyInfo.timeMax.toString()});
          //   }
          // });
          let awaitedPromise = await this.findFreeTime(JSON.stringify(bodyInfo), accessToken);
          console.log("this is the parsed function" + JSON.stringify(awaitedPromise));
          if(awaitedPromise) {
            console.log("THE REPSONSE IS TRUE");
            validTimes.push({"start": bodyInfo.timeMin.toString(), "end": bodyInfo.timeMax.toString()});
          }
          parsedInfo.startTime = addHours(new Date(parsedInfo.startTime), 1);
          end_time = addHours(end_time, 1);

          i++;
        }
        for(var validtime in validTimes) {
          console.log((JSON.stringify(validTimes[validtime], null, 4)));
        }
        console.log("this is valid times " + validTimes + "type is " + typeof validTimes);
        this.setState({freeTimeResult: validTimes});
        return validTimes;
        } else {
          return null;
        }
        };



/**
 * findFreeTime performs the Freebusy query, using the bodyInfo we prepared in suggestTime().
 * We then parse through the response body, checking for any times in each user's calendar that
 * conflicts with potential time/dates; eventually settling on an open slot or list of open slots.
 * @param bodyInfo The prepared JSON object from findFreeTime, contains necessary fields like startTime, endTime, and calendars for Google API
 * @param accessToken Necessary to use any Google API. Passed through from the SignInScreen when user initially authenticates
 */
private async findFreeTime(bodyInfo, accessToken) {
  //TODO: need groupID
  // let queryInfo = this.props.navigation.state.params;
  // console.log(queryInfo.timeOfDay.toString());
  let timeOfDay = {
    "0": "T14:00:00.00Z",
    "1": "T20:00:00.00Z",
    "2": "T02:00:00.00Z",
    "3": "T08:00:00.00Z"
  }
  // console.log(timeOfDay[queryInfo.timeOfDay.toString()]);
  // let parsedInfo = await this.parseInfo(queryInfo);

  let fetchResponse = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: bodyInfo
  });

  let fetchResponseJSON = await fetchResponse.json();
  for(var calendar in fetchResponseJSON.calendars) {
    if(fetchResponseJSON.calendars.hasOwnProperty(calendar)) {
      console.log(calendar + "->" + fetchResponseJSON.calendars[calendar].busy);
      console.log("this is calendar bool" + (fetchResponseJSON.calendars[calendar].busy.length > 0))
      if(fetchResponseJSON.calendars[calendar].busy.length > 0) {
        console.log("THIS IS RETURNING FALSE");
        return false;
      }
    }
  }
  return true;
    // console.log(parsedInfo.startTime);
    // console.log(parsedInfo.endTime);
    // console.log(queryInfo.groupName);
    // console.log("BODY ITEMS::: ", bodyInfo)




    // console.log("in findfreetime");
    //   fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json',
    //       Authorization: `Bearer ${accessToken}`
    //     },
    //     body: bodyInfo
    //   }).then(response => response.json()
    //   ).then(responseJSON => {
    //     console.log("RESPONSE RECEIVED: ", responseJSON);
    //     // let calendars = responseJSON.calendars;
    //     for(var calendar in responseJSON.calendars) {
    //       if(responseJSON.calendars.hasOwnProperty(calendar)) {
    //         console.log(calendar + "->" + responseJSON.calendars[calendar].busy);
    //         console.log("this is calendar bool" + (responseJSON.calendars[calendar].busy.length > 0))
    //         if(responseJSON.calendars[calendar].busy.length > 0) {
    //           console.log("THIS IS RETURNING FLASE");
    //           return false;
    //         }
    //     }
    //   }
    //   console.log("THIS IS RETURNING TRUE");
    //   return true;
    // });
}

/**
 * Utility function that is used in prepared bodyInfo. Main usage is parsing date objects into desirable formats.
 * @param queryInfo contains unparsed information i.e. duration of event, start date(with no time)
 */
private async parseInfo(queryInfo) {
  console.log("in parseinfo");
  let interval = queryInfo.hours
  let timeOfDay = {
    "0": "T14:00:00.00Z",
    "1": "T20:00:00.00Z",
    "2": "T02:00:00.00Z",
    "3": "T08:00:00.00Z"
  }
  console.log(queryInfo.earliestDate)
  console.log(timeOfDay[queryInfo.timeOfDay.toString()])
  let startIntervalDT = (queryInfo.earliestDate + timeOfDay[queryInfo.timeOfDay.toString()]);
  //console.log("\NEW\nStart Interval: ", startIntervalDT.substring(0, startIntervalDT.length - 4));
  console.log("Type of Start Interval: ", typeof startIntervalDT);
  let a = Date.parse(startIntervalDT);
  console.log("A: ", a);

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
      let buttonTimes = this.state.freeTimeResult.map((freeTime, i) => {
        let newDate = new Date(freeTime.start);
        let newString = convertDateToString(newDate);
        let startDate = new Date(freeTime.start).toISOString();
        return <BottomButton
                  buttonAction={() => {
                    createEvent('mildollarbaby@gmail.com',
                      this.state.accessToken,
                      queryInfo.description,
                      {'dateTime': new Date(freeTime.end).toISOString(), 'timeZone': 'America/Los_Angeles'},
                      {'dateTime': new Date(freeTime.start).toISOString(), 'timeZone': 'America/Los_Angeles'},
                      [
                        {'email': 'mildollarbaby@gmail.com'},
                        {'email': 'bensonjaminhan@gmail.com'},
                        {'email': 'aperson707@gmail.com'}
                      ]);
                      console.log("what is groupid" + this.props.navigation.getParam('id', 'a'));
                    sendPush('PlanIt notification', 'body', this.props.navigation.getParam('id', 'a'));
                    addEventToGroup(this.props.navigation.getParam('id', 'a'), {'description': queryInfo.description, 'timestart': new Date(freeTime.start).toISOString()});
                    this.props.navigation.navigate('EventCreationConfirmationScreen');
                  }}
                  buttonFilled={false}
                  buttonText={newString} />
      });

        return (
          <ButtonScreenTemplate
            bottomButtonText='Get free/busy info'
            darkBackground={true}
            bottomButtonFunction={this.suggestTime}
          >
          {buttonTimes }
          <Text>
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
