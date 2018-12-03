import React from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import * as Expo from 'expo';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import GlobalStyles from '../globals/GlobalStyles';

type EventCreationOptionsScreenState = {
  isLoading: boolean
}

class EventCreationOptionsScreen extends React.Component<EventCreationOptionsScreenState, {}> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    this.setState({isLoading: false});
  }

  static navigationOptions = {
    title: 'Your Groups',
  };

  render() {
    let loadingIndicator;
    if(this.state.isLoading) {
      loadingIndicator = <ActivityIndicator size='large'/>
    }
    let queryInfo = this.props.navigation.state.params;
    return (
      <ButtonScreenTemplate
        bottomButtonText='Next'
        bottomButtonFunction={()=> this.props.navigation.navigate('FindTimeScreen', {
            groupName: queryInfo.groupName, 
            timeOfDay: queryInfo.timeOfDay,
            earliestDate: queryInfo.earliestDate,
            latestDate: queryInfo.latestDate,
            hours: queryInfo.hours,
            minutes: queryInfo.minutes,
            id: queryInfo.groupId,
            description: queryInfo.description,
          }
          )}
      >
        {loadingIndicator}
        <Text>
          {queryInfo.description}
        </Text>
        <Text>
          {queryInfo.groupId}
        </Text>
        <Text>
          {queryInfo.groupName}
        </Text>
        <Text>
          {queryInfo.timeOfDay}
        </Text>
        <Text>
          {queryInfo.earliestDate}
        </Text>
        <Text>
          {queryInfo.latestDate}
        </Text>
        <Text>
          {queryInfo.hours}
        </Text>
        <Text>
          {queryInfo.minutes}
        </Text>
      </ButtonScreenTemplate>
    );
  }
}

export default EventCreationOptionsScreen
