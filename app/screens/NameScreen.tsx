import React from 'react';
import { Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import BottomButton from '../components/BottomButton';
import { createStackNavigator } from 'react-navigation';

class NameScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.intro}>
          Nice to meet you. What's your name?
        </Text>
        <TextInput
          style={{fontSize: GlobalStyles.fontSize.large.fontSize, fontFamily: GlobalStyles.fontFamily.secondaryFontBold.fontFamily}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          style={styles.button}
          color={GlobalStyles.color.black}
          title="Next"
          onPress={() => {
            if (this.state.text === '') {
              alert('Please enter valid name.')
            } else {
              this.props.navigation.navigate('SignInScreen');
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.color.purple,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  intro: {
    fontSize: GlobalStyles.fontSize.large.fontSize,
    fontFamily: GlobalStyles.fontFamily.primaryFontBold.fontFamily,
    color: GlobalStyles.textColor.white.color,
    margin: 10,
  },
});

export default NameScreen
