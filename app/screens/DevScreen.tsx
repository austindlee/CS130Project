import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import { createStackNavigator } from 'react-navigation';

function testAlert() {
  Alert.alert("The button was pressed");
}

class DevScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <BottomButton buttonText="hello" buttonAction={testAlert}></BottomButton>
        <BottomButton buttonText="hello" buttonAction={testAlert}></BottomButton>
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
