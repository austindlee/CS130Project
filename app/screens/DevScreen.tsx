import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import { createStackNavigator } from 'react-navigation';

class DevScreen extends React.Component {
  static navigationOptions = {
    title: 'Development Staging',
  };

  render() {
    return (
      <Button
        title='Component Playground'
        onPress={() => this.props.navigation.navigate('ComponentPlayground')}
      />
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
