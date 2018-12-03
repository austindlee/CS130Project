import React from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import GroupCard from '../components/GroupCard';
import { getUsersGroups } from '../utils/firebase/UserUtils';
import { getGroupInfo } from '../utils/firebase/GroupsUtils';
import * as Expo from 'expo';
import ButtonScreenTemplate from './ButtonScreenTemplate';

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
      let groupArrayInfo = await getGroupInfo(groupID);
      groupArrayInfo["id"] = groupID;
      return groupArrayInfo;
    })
    const groupArray = await Promise.all(groupArrayPromises);
    this.setState({groupData: groupArray, isLoading: false});
  }

  async componentWillReceiveProps(nextProps) {
    if(nextProps.navigation.state.params.refreshProps) {
      this.setState({isLoading: true});
      let userID = await Expo.SecureStore.getItemAsync('localUserID');
      let groupIDArray = await getUsersGroups(userID);
      //  use  map?
      let groupArrayPromises= groupIDArray.map(async (groupID) => {
        let groupArrayInfo = await getGroupInfo(groupID);
        groupArrayInfo["id"] = groupID;
        return groupArrayInfo;
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
              <TouchableOpacity onPress={() => this.props.navigation.navigate('GroupScreen', {name: item.name, users: item.users, color: item.color, id: item.id})}>
                <GroupCard groupName={item.name} groupUserId={item.users} groupColor={item.color ? item.color : 0}/>
              </TouchableOpacity>}
          />
      </ButtonScreenTemplate>
    );
  }
}

export default GroupListScreen
