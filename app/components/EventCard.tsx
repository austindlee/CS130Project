import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import { LinearGradient } from 'expo';
import * as TimeConversion from '../utils/local/TimeConversion';
import ProfilePhoto from './ProfilePhoto';
import { getGroupInfo } from '../utils/firebase/GroupsUtils';
import { getUserInfo } from '../utils/firebase/UserUtils';

/**
 * @param eventName - a string representing the name of the event
 * @param eventDate - a Date represeting the date of the event
 */
type EventCardProps = {
  eventName: string,
  eventDate?: string,
}

/** A event card showing event name and date of event.
 * See EventCardProps for parameters
 */
export default class EventCard extends React.Component<EventCardProps> {
  constructor(props: EventCardProps) {
    super(props);
  }

  render() {
    const currentDate = new Date();
    let dateDisplay =
    <Text style={[GlobalStyles.fontSize.small, GlobalStyles.fontFamily.secondaryFont, GlobalStyles.textColor.white, styles.timeContainer]}>
      {TimeConversion.convertDateToString(new Date(this.props.eventDate))}
    </Text>

    return (
      <View style={styles.eventContainer} elevation={5}>
        <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.textColor.black, GlobalStyles.fontFamily.primaryFontBold]}>{this.props.eventName}</Text>
        {dateDisplay}
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    eventContainer: {
      backgroundColor: '#fff',
      marginTop: 12,
      marginBottom: 12,
      marginLeft: 12,
      marginRight: 12,
      height: 80,
      borderRadius: 8,
      paddingTop: 12,
      paddingLeft: 12,
      paddingRight: 12,
      justifyContent: 'center',
      alignSelf: 'stretch',
    },
    timeContainer: {
      backgroundColor: '#000',
      marginTop: 5,
      marginBottom: 12,
      paddingTop: 4,
      height: 24,
      borderRadius: 12,
      paddingLeft: 4,
      paddingRight: 4,
      justifyContent: 'center',
      alignSelf: 'flex-start'
    },
  }
);
