import React from 'react';
import { Alert, StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import * as Expo from 'expo';
import BottomButton from '../components/BottomButton';
import GroupCard from '../components/GroupCard';
import { createStackNavigator } from 'react-navigation';
import { createUser } from '../utils/firebase/UserUtils';
import { getUsersGroups } from '../utils/firebase/UserUtils';
import GlobalStyles from '../globals/GlobalStyles';

/** Test function passed in to a button */
function testAlert(): void {
  Alert.alert("The button was pressed");
}

class StartScreen extends React.Component {
  static navigationOptions = {
    title: 'PlanIt',
  };
  render() {
    return (
      <ImageBackground
        source={require('../assets/splashscreen.png')}
        style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          PlanIt
        </Text>
        <Text style={styles.message}>
          MAKE YOUR WORLD GO ROUND
        </Text>
        <Button
          color={GlobalStyles.color.purple}
          title="Get Started"
          onPress={() => {
            this.props.navigation.navigate('NameScreen');
          }}
        />
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: GlobalStyles.fontSize.large.fontSize,
    fontFamily: GlobalStyles.fontFamily.primaryFontBold.fontFamily,
    color: GlobalStyles.textColor.purple.color,
    textAlign: 'center',
    margin: 10,
  },
  message: {
    textAlign: 'center',
    color: '#333333',
    fontSize: GlobalStyles.fontSize.small.fontSize,
    fontFamily: GlobalStyles.fontFamily.secondaryFontBold.fontFamily,
    marginBottom: 30,
  },
});

export default StartScreen
