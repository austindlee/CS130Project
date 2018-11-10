import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import { createStackNavigator } from 'react-navigation';

/** Test function passed in to a button */
function testAlert(): void {
  Alert.alert("The button was pressed");
}

class ComponentPlaygroundScreen extends React.Component {
  static navigationOptions = {
    title: 'Component Playground',
  };

  render() {
    return (
      <View style={styles.container}>
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

export default ComponentPlaygroundScreen
