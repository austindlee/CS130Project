import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import { createStackNavigator } from 'react-navigation';
import * as Expo from 'expo';

class DevScreen extends React.Component {
  static navigationOptions = {
    title: 'Development Staging',
  };

  render() {
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
          title="AddTestEventToGoogleCalendarOnMay28,2015"
          onPress={() => this.props.navigation.navigate('AddEventToCalendarScreen')}
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
