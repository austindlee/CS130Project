import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import { LinearGradient } from 'expo';
import * as TimeConversion from '../utils/local/TimeConversion';

type GroupCardNextEventProps = {
  nextEventName: string,
  nextEventDate: Date
}

type GroupCardProps = {
  groupName: string,
  groupPhotos?: Object,
  groupNextEvent?: GroupCardNextEventProps
}

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

    return (
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={GlobalStyles.gradients.green}
          style={styles.gradientContainer}
          start={[0,0]}
          end={[1,1]}>
        <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.textColor.white, GlobalStyles.fontFamily.primaryFontBold]}>{this.props.groupName}</Text>
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
      height: 24,
      borderRadius: 12,
      paddingLeft: 10,
      paddingRight: 10,
      justifyContent: 'center',
      alignSelf: 'flex-start'
    },
    gradientContainer: {
      padding: 10,
      borderRadius: 12
    }
  }
);
