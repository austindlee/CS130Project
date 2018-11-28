import React from 'react';
import { Alert, Button, StyleSheet, Text, View, TextInput } from 'react-native';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import GlobalStyles from '../globals/GlobalStyles';

class NameScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.submitName = this.submitName.bind(this);
  }

  private submitName(): void {
    if (this.state.text === '') {
      alert('Please enter valid name.')
    } else {
      this.props.navigation.navigate('SignInScreen', {name: this.state.text});
    }
  }

  render() {
    return (
      <ButtonScreenTemplate
        bottomButtonText='Next'
        darkBackground={true}
        bottomButtonFunction={this.submitName}
      >
        <Text style={styles.intro}>
          Nice to meet you. What's your name?
        </Text>
        <TextInput
          style={styles.intro}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='Enter name here'
          onSubmitEditing={this.submitName}
        />
      </ButtonScreenTemplate>
    );
  }
}

const styles = StyleSheet.create({
  intro: {
    fontSize: GlobalStyles.fontSize.large.fontSize,
    fontFamily: GlobalStyles.fontFamily.primaryFontBold.fontFamily,
    color: GlobalStyles.textColor.white.color,
  },
});

export default NameScreen
