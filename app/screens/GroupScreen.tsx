import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import GroupCard from '../components/GroupCard';
import GlobalStyles from '../globals/GlobalStyles';
import { LinearGradient } from 'expo';
import { getUsersGroups } from '../utils/firebase/UserUtils';
import { getGroupInfo } from '../utils/firebase/GroupsUtils';
import * as Expo from 'expo';
import ProfilePhoto from '../components/ProfilePhoto';
import ButtonScreenTemplate from './ButtonScreenTemplate';

class GroupScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentDate = new Date();
    let dateDisplay = <Text style={[GlobalStyles.fontSize.small, GlobalStyles.fontFamily.secondaryFont, GlobalStyles.textColor.white, styles.timeContainer]}>{currentDate.toString()}</Text>

    const profilePhoto = <ProfilePhoto />;

    return (
      <View style={styles.background}>
        <LinearGradient
          colors={GlobalStyles.gradients.purple}
          style={styles.gradientContainer}
          start={[0,0]}
          end={[1,1]}>
        <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.textColor.white, GlobalStyles.fontFamily.primaryFontBold, styles.header]}>CS 130 Pals</Text>
        </LinearGradient>
        <View style={styles.profilePhotoContainer}>
          {profilePhoto}
        </View>
        <LinearGradient
          colors={GlobalStyles.gradients.purple}
          style={styles.separator}
          start={[0,0]}
          end={[1,1]} />
        <View style={styles.eventContainer} elevation={5}>
          <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.textColor.black, GlobalStyles.fontFamily.primaryFontBold]}>Cool event name</Text>
          {dateDisplay}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    background: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      height: 40,
      marginTop: 24,
      marginBottom: 24,
      marginLeft: 12,
    },
    eventContainer: {
      backgroundColor: '#fff',
      marginTop: 12,
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
    profilePhotoContainer: {
      flexDirection: 'row',
      marginLeft: 12,
      marginTop: 8,
      marginBottom: 4,
      height: 30,
    },
    separator: {
      height: 3,
      alignSelf: 'stretch',
      marginTop: 8,
    }
  }
);

export default GroupScreen
