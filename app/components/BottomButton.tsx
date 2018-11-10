import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

/**
 * @param buttonAction - buttonAction - a function that navigates to a different view
 * @param buttonText - buttonText - what the text of the button should show
 * @param buttonFilled - buttonFilled - boolean value for hollow or filled button
 */
export interface BottomButtonProps {
  buttonAction: any;
  buttonText: string;
  buttonFilled?: boolean;
}

/**
 * Button used to switch between views in navigation. Props are defined in
 * BottomButtonProps interface
 */
class BottomButton extends React.Component<BottomButtonProps> {
  constructor(props: BottomButtonProps) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.buttonAction}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{this.props.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 5,
    borderColor: 'purple',
    backgroundColor: '#fff',

    // Shadow requirement for Android
    elevation: 5,

    // Shadow requirements for iOS
    shadowRadius: 5,
    shadowOpacity: 0.25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 30
  }
});

export default BottomButton
