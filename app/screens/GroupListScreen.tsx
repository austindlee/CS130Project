import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
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
    //  use  map?
    let groupArrayPromises= groupIDArray.map(async (groupID) => {
      return await getGroupInfo(groupID);
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
            renderItem={({item}) => <GroupCard groupName={item.name} groupPhotos={['1','2']}></GroupCard>}
          />
      </ButtonScreenTemplate>
    );
  }
}

export default GroupListScreen
