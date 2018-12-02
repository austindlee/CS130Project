import React from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import GroupCard from '../components/GroupCard';
import { getUsersGroups } from '../utils/firebase/UserUtils';
import { getGroupInfo } from '../utils/firebase/GroupsUtils';
import * as Expo from 'expo';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import TimePicker from '../components/TimePicker';
type EventCreationTimeScreenProps = {
  refreshProps?: boolean
}

type EventCreationTimeScreenState = {
  groupData: any,
  isLoading: boolean
}

class EventCreationTimeScreen extends React.Component<EventCreationTimeScreenProps, EventCreationTimeScreenState, {}> {
  constructor(props) {
    super(props);
    this.selectTimeOfDayButton = this.selectTimeOfDayButton.bind(this);

    this.state = {
      groupData: [],
      isLoading: true,
      timeOfDayNumber: 0,
    };
  }

  selectTimeOfDayButton(dayNumber: number) {
    console.log(dayNumber);
    this.setState({timeOfDayNumber: dayNumber});
  }

  async componentDidMount() {
    let userID = await Expo.SecureStore.getItemAsync('localUserID');
    let groupIDArray = await getUsersGroups(userID);
    let groupArrayPromises = groupIDArray.map(async (groupID) => {
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
        bottomButtonText='Next'
        bottomButtonFunction={()=> this.props.navigation.navigate('EventCreationDateRangeScreen', {timeOfDayNumber: this.state.timeOfDayNumber})}
      >
        {loadingIndicator}
        <Text>
          {this.state.timeOfDayNumber}
        </Text>
        <TimePicker
          onSelectButton={this.selectTimeOfDayButton}
        >
        </TimePicker>
      </ButtonScreenTemplate>
    );
  }
}

export default EventCreationTimeScreen
