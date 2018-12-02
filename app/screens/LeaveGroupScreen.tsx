import React from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import * as Expo from 'expo';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import GlobalStyles from '../globals/GlobalStyles';
import { removeFromGroup } from '../utils/firebase/GroupsUtils';

type EventCreationOptionsScreenState = {
  isLoading: boolean
}

class EventCreationOptionsScreen extends React.Component<EventCreationOptionsScreenState, {}> {
  constructor(props) {
    super(props);
    this.leaveGroup = this.leaveGroup.bind(this);
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    this.setState({isLoading: false});
  }

  async leaveGroup(): void {
    let userID = await Expo.SecureStore.getItemAsync('localUserID');
    // removeFromGroup(userID, this.props.navigation.state.params.groupId);
    removeFromGroup(userID, "123456789");
    this.props.navigation.navigate('GroupListScreen');
  }

  static navigationOptions = {
    title: 'Leave group',
  };

  render() {
    let loadingIndicator;
    if(this.state.isLoading) {
      loadingIndicator = <ActivityIndicator size='large'/>
    }
    let queryInfo = this.props.navigation.state.params;
    return (
      <ButtonScreenTemplate
        bottomButtonText='Confirm Leave'
        bottomButtonFunction={this.leaveGroup}
      >
        <Text>
          {"Are you sure you want to leave " + queryInfo.groupName}
        </Text>
      </ButtonScreenTemplate>
    );
  }
}

export default EventCreationOptionsScreen
