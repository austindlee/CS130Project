import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import { LinearGradient } from 'expo';
import { getUsersGroups } from '../utils/firebase/UserUtils';
import { getUserInfo } from '../utils/firebase/UserUtils';
import { getGroupInfo } from '../utils/firebase/GroupsUtils';
import * as Expo from 'expo';
import ProfilePhoto from '../components/ProfilePhoto';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import EventCard from '../components/EventCard';

class GroupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
      profilePhotosLoading: true,
      profilePhotoURLs: []
    };
  }

  async componentDidMount() {
    const profilePhoto = <ProfilePhoto />;
    let users = this.props.navigation.getParam('users', profilePhoto);
    const userPromises = users.map(async (id: string) => {
      return await getUserInfo(id);
    })
    const userArray = await Promise.all(userPromises);
    const userPics = userArray.map((user) => {
      return (user.photoUrl ? user.photoUrl : '');
    });
    const currentDate = new Date();
    this.setState({
      eventData: [{name: "Cool event", date: currentDate.toString()}],
      // TODO: populate with actual eventData
      profilePhotoURLs: userPics,
      profilePhotosLoading: false
    });
  }

  render() {
    const currentDate = new Date();
    let dateDisplay = <Text style={[GlobalStyles.fontSize.small, GlobalStyles.fontFamily.secondaryFont, GlobalStyles.textColor.white, styles.timeContainer]}>{currentDate.toString()}</Text>

    const groupName = this.props.navigation.getParam('name', 'Group Name');
    const groupId = this.props.navigation.state.params.id;
    const profilePhotoPlaceholder = <ProfilePhoto />;
    const profilePhoto = this.state.profilePhotoURLs.map((url: string) => <ProfilePhoto key={url} profilePhotoURL={url}/>);

    const groupColor = this.props.navigation.getParam('color', 0);
    return (
      <ButtonScreenTemplate
        topButtonText='Leave Group'
        topButtonFunction={()=> this.props.navigation.navigate('LeaveGroupScreen', {groupName: groupName, groupId: groupId})}
        bottomButtonText='Plan Event'
        bottomButtonFunction={()=> this.props.navigation.navigate('EventCreationTimeScreen', {groupName: groupName, groupId: groupId})}
        darkBackground={false}
      >
      <View style={styles.background}>
        <LinearGradient
          colors={GlobalStyles.gradientsArray[groupColor]}
          style={styles.gradientContainer}
          start={[0,0]}
          end={[1,1]}>
        <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.textColor.white, GlobalStyles.fontFamily.primaryFontBold, styles.header]}>
          {groupName}
        </Text>
        </LinearGradient>
        <View style={styles.profilePhotoContainer}>
          {this.state.profilePhotosLoading ? profilePhotoPlaceholder : profilePhoto}
        </View>
        <LinearGradient
          colors={GlobalStyles.gradientsArray[groupColor]}
          style={styles.separator}
          start={[0,0]}
          end={[1,1]} />
        <FlatList
          data={this.state.eventData}
          keyExtractor={(item) => item.name}
          renderItem={({item}) =>
            <EventCard eventName={item.name} eventDate={item.date}>
            </EventCard>}
        />
      </View>
      </ButtonScreenTemplate>
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
    },
  }
);

export default GroupScreen
