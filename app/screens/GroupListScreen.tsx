import React from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import GroupCard from '../components/GroupCard';
import { getUsersGroups } from '../utils/firebase/UserUtils';
import { getGroupInfo } from '../utils/firebase/GroupsUtils';
import * as Expo from 'expo';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';

type GroupListScreenProps = {
  refreshProps?: boolean
}

type GroupListScreenState = {
  groupData: any,
  isLoading: boolean
}

class GroupListScreen extends React.Component<GroupListScreenProps, GroupListScreenState, {}> {
  constructor(props) {
    super(props);

    this.state = {
      groupData: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    let userID = await Expo.SecureStore.getItemAsync('localUserID');
    let groupIDArray = await getUsersGroups(userID);
    let groupArrayPromises = groupIDArray.map(async (groupID) => {
      return await getGroupInfo(groupID);
    })
    const groupArray = await Promise.all(groupArrayPromises);
    this.setState({groupData: groupArray, isLoading: false});
    //console.log("GROUP DATA: ", groupIDArray)
    //console.log("GROUP DATA users: ", this.state.groupData[0].users)
    for (var i in groupIDArray){
      console.log("Updating data().calendarIDs for ", groupIDArray[i])
      await getUsersCalendarID(this.state.groupData[0].users, groupIDArray[i]); //get list of Calendar IDs for all members in the Group, then send this list to Firebase
    }
  }

  async componentWillReceiveProps(nextProps) {
    if(nextProps.navigation.state.params.refreshProps) {
      this.setState({isLoading: true});
      let userID = await Expo.SecureStore.getItemAsync('localUserID');
      let groupIDArray = await getUsersGroups(userID);
      //  use  map?
      let groupArrayPromises= groupIDArray.map(async (groupID) => {
        return await getGroupInfo(groupID);
      })
      const groupArray = await Promise.all(groupArrayPromises);
      this.setState({groupData: groupArray, isLoading: false});

    }
  }

  static navigationOptions = {
    title: 'Your Groups',
  };

  render() {
    let loadingIndicator;
    if(this.state.isLoading) {
      loadingIndicator = <ActivityIndicator size='large'/>
    }
    return (
      <ButtonScreenTemplate
        topButtonText='Create Group'
        topButtonFunction={()=> this.props.navigation.navigate('CreateGroupScreen')}
        bottomButtonText='Join Group'
        bottomButtonFunction={()=> this.props.navigation.navigate('JoinGroupScreen')}
      >
        {loadingIndicator}
          <FlatList
            data={this.state.groupData}
            keyExtractor={(item) => item.name}
            renderItem={({item}) =>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('GroupScreen', {name: item.name, users: item.users, color: item.color})}>
                <GroupCard groupName={item.name} groupUserId={item.users} groupColor={item.color ? item.color : 0}/>
              </TouchableOpacity>}
          />
      </ButtonScreenTemplate>
    );
  }
}

/**
 * Gets the calendar IDs of the users in the Group and sends a list of calendar IDs to the Group in Firebase
 * @param usersList - array of users in the current Group
* @param groupID - the integer Group ID of a Group
 * @return - an array of calendar IDs of all users in the Group
 */
export async function getUsersCalendarID(usersList, groupID) {
  // initialize Firestore
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);


  let allCalendarIds = [];
  //console.log("USERS LIST: ", usersList);
  for (var i in usersList){
    //console.log("Trying to get user: ", usersList[i])
    await db.collection('users').doc(usersList[i]).get().then((doc) => {
      //console.log("Checking doc......")
      if(doc.exists) {
          //console.log(doc.data().userCalendarId)
          if (doc.data().userCalendarId == null){
            allCalendarIds.push(null)
          }
          else{
              allCalendarIds.push(doc.data().userCalendarId)
          }

      }
      else {
        console.log("(2) getUsersCalendarID: Can't find calendarID for user: ", usersLists[i]);
      }
    });

  }
  console.log(allCalendarIds);

  //update Group in Firebase with this new list of calendarIDs
  var ref = db.collection("groups").doc(groupID);
  return ref.update({
    calendarIDs: allCalendarIds
  })
  .then(function() {
      console.log("Document successfully updated! Group ID: ", groupID);
  })
  .catch(function(error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
  });

  return allCalendarIds;
}

export default GroupListScreen
