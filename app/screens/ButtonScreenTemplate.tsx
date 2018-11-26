import React from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import BottomButton from '../components/BottomButton';
import GroupCard from '../components/GroupCard';
import { getUsersGroups } from '../utils/firebase/UserUtils';
import { getGroupInfo } from '../utils/firebase/GroupsUtils';
import * as Expo from 'expo';

type GroupListScreenProps = {
  refreshProps?: boolean
}

type GroupListScreenState = {
  groupData: any,
  isLoading: boolean
}

class ButtonScreenTemplate extends React.Component<GroupListScreenProps, GroupListScreenState, {}> {
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
      <View style={styles.container}>
        <View style={styles.listContainer}>
          {loadingIndicator}
          <FlatList
            data={this.state.groupData}
            renderItem={({item}) => <GroupCard groupName={item.name}></GroupCard>}
          />
        </View>
        <View style={styles.buttonActions}>
          <BottomButton
            buttonAction={()=> this.props.navigation.navigate('CreateGroupScreen')}
            buttonText='Create Group'
            buttonFilled={false}
          />
          <BottomButton
            buttonAction={()=> this.props.navigation.navigate('JoinGroupScreen')}
            buttonText='Join Group'
            buttonFilled={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 0,
    justifyContent: 'space-between'
  },
  lastButtonMargin: {
    marginTop: 10
  },
  buttonActions: {
    height: 130,
    alignSelf: 'stretch',
  },
  listContainer: {
    flex: 1
  }
});

export default ButtonScreenTemplate
