import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import { createStackNavigator } from 'react-navigation';
import { sendPush } from '../utils/local/PushNotifications';
import { test, addTestEventToCalendar } from '../utils/local/AddEventToCalendar';
import { getEventsFromGroup, addEventToGroup} from '../utils/firebase/GroupsUtils';

import * as Expo from 'expo';

class DevScreen extends React.Component {
  static navigationOptions = {
    title: 'Development Staging',
  };

  render() {
    var event = {description:"here5", timestart:"start", timeend:"end"};
    return (
      <View>
        <Button
          title='PlanIt'
          onPress={() => this.props.navigation.navigate('StartScreen')}
        />
        <Button
          title='Group List Screen'
          onPress={() => this.props.navigation.navigate('GroupListScreen')}
        />
        <Button
          title='Busy Finder'
          onPress={() => this.props.navigation.navigate('FindTimeScreen')}
        />
        <Button
          title='Event Creation'
          onPress={() => this.props.navigation.navigate('EventCreationScreen')}
        />
        <Button
          title='Send Push'
          onPress={async () => sendPush('hi', 'test', '196588573')}
        />
        <Button
          title="AddTestEventToCalendar"
          onPress={async() => addTestEventToCalendar()}
        />
        <Button
          title="Get Events from Group"
          onPress={async() => getEventsFromGroup('120342527')}
        />
        <Button
          title="Add Event to Group"
          onPress={async() => addEventToGroup('120342527', event)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DevScreen
