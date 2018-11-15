import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import { createStackNavigator } from 'react-navigation';

class GroupListScreen extends React.Component {
  static navigationOptions = {
    title: 'Group List Screen',
  };

  render() {
    return (
      <View>

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

export default GroupListScreen
