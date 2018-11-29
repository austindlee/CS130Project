import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import { LinearGradient } from 'expo';
import * as TimeConversion from '../utils/local/TimeConversion';
import ProfilePhoto from './ProfilePhoto';

/**
 * @param nextEventName - nextEventName - name of the next event for a specific group
 * @param nextEventDate - nextEventDate - date object containing the date + time info for the next event
 */
type GroupCardNextEventProps = {
  nextEventName: string,
  nextEventDate: Date
}

/**
 * @param groupName - groupName - a string representing the name of the group
 * @param groupPhotos - groupPhotos - an array of URLs containing the profile photos in the group
 * @param groupNextEvent - see GroupCardNextEventProps - given if the group has an event coming up
 */
type GroupCardProps = {
  groupName: string,
  groupPhotos?: string[],
  groupNextEvent?: GroupCardNextEventProps
}

/** A badge that is part of the Group card containing the info of the next event.
 * See GroupCardNextEventProps for parameters
 */
class NextEventBadge extends React.Component<GroupCardNextEventProps> {
  constructor(props: GroupCardNextEventProps) {
    super(props);
  }

  render() {
    let day: number = this.props.nextEventDate.getDate();
    let month: number = this.props.nextEventDate.getMonth();
    let hours: number = this.props.nextEventDate.getHours();
    let minutes: number = this.props.nextEventDate.getMinutes();
    let dayOfWeek: number = this.props.nextEventDate.getDay();

    const currentDate = new Date();
    let dateDisplay;

    if(TimeConversion.dateDiffInDays(currentDate, this.props.nextEventDate) > 6) {
      dateDisplay = <Text style={[GlobalStyles.fontSize.small, GlobalStyles.fontFamily.secondaryFont, GlobalStyles.textColor.white]}>{month}/{day} at {hours}:{minutes}</Text>
    } else {
      dateDisplay = <Text style={[GlobalStyles.fontSize.small, GlobalStyles.fontFamily.secondaryFont, GlobalStyles.textColor.white]}>{TimeConversion.dayNumberMap[dayOfWeek]} at {hours}:{minutes}</Text>
    }

    return (
      <View style={styles.badgeContainer}>
        {dateDisplay}
      </View>
    );
  }
}

/** A group card showing group name, next event and members.
 * See GroupCardProps for parameters
 */
export default class GroupCard extends React.Component<GroupCardProps> {
  constructor(props: GroupCardProps) {
    super(props);
  }

  render() {
    let testDate = new Date();

    let testProps = {
      groupName: 'Test Group',
      groupPhotos: {'fake': 'yes'},
      groupNextEvent: {
        nextEventName: 'Test Event',
        nextEventDate: testDate
      }
    }

    // TODO: Fetch user profile photo information in ComponentDidMount
    let profilePhotos = this.props.groupPhotos.map((photoURL) => {
      return <ProfilePhoto />
    })

    return (
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={GlobalStyles.gradients.yellow}
          style={styles.gradientContainer}
          start={[0,0]}
          end={[1,1]}>
        <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.textColor.white, GlobalStyles.fontFamily.primaryFontBold]}>{this.props.groupName}</Text>
        <View style={styles.profilePhotoContainer}>
          {profilePhotos}
        </View>
        <NextEventBadge
          nextEventName='Test Event'
          nextEventDate={testDate}
        />
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    cardContainer: {
      marginBottom: 10
    },
    badgeContainer: {
      backgroundColor: '#000',
      marginTop: 5,
      height: 24,
      borderRadius: 12,
      paddingLeft: 10,
      paddingRight: 10,
      justifyContent: 'center',
      alignSelf: 'flex-start'
    },
    gradientContainer: {
      paddingTop: 5,
      padding: 10,
      borderRadius: 12
    },
    profilePhotoContainer: {
      flexDirection: 'row'
    }
  }
);
