import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import { LinearGradient } from 'expo';

type GroupCardNextEventProps = {
  nextEventName: string,
  nextEventDate: Date
}

type GroupCardProps = {
  groupName: string,
  groupPhotos?: Object,
  groupNextEvent?: GroupCardNextEventProps
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function dateDiffInDays(a: Date, b: Date): number {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const dayNumberMap: any = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday'
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

    if(dateDiffInDays(currentDate, this.props.nextEventDate) > 6) {
      dateDisplay = <Text style={styles.text}>{month}/{day} at {hours}:{minutes}</Text>
    } else {
      dateDisplay = <Text style={styles.text}>{dayNumberMap[dayOfWeek]} at {hours}:{minutes}</Text>
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
        <Text>{this.props.groupName}</Text>
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
    text: {
      color: '#fff',
      fontSize: 16
    },
    badgeContainer: {
      backgroundColor: '#000',
      height: 24,
      borderRadius: 12,
      paddingLeft: 10,
      paddingRight: 10,
      alignSelf: 'flex-start'
    },
    gradientContainer: {
      padding: 10,
      borderRadius: 12
    }
  }
);
