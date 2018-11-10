import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';

/**
 * @param buttonAction - buttonAction - a function that navigates to a different view
 * @param buttonText - buttonText - what the text of the button should show
 * @param buttonFilled - buttonFilled - boolean value for hollow or filled button
 */
type BottomButtonProps  = {
  buttonAction: any;
  buttonText: string;
  buttonFilled: boolean;
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
    let styleType;
    if (this.props.buttonFilled) {
      styleType = {};
    }
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.buttonAction}
          style={[styles.button, filledButtonStyle(this.props.buttonFilled)]}
        >
          <Text style={[styles.buttonText, buttonTextColor(this.props.buttonFilled)]}>{this.props.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

/**
 * Internal function that indicates whether button text should be black or white
 * @param isFilled whether or not the button is filled - passed in as a prop to higher level component
 * @return JSON object with appropriate CSS styling
 */
function buttonTextColor(isFilled: boolean): Object {
  if(isFilled) {
    return {
      color: '#fff'
    }
  } else {
    return {
      color: '#000'
    }
  }
}

/**
 * Internal function that indicates whether button should be filled or hollow
 * @param isFilled whether or not the button is filled - passed in as a prop to higher level component
 * @return JSON object with appropriate CSS styling
 */
function filledButtonStyle(isFilled: boolean): Object {
  if(isFilled) {
    return {
      backgroundColor: GlobalStyles.color.purple,
      borderRadius: 25
    }
  } else {
    return {
      backgroundColor: '#fff',
      borderRadius: 25,
      borderWidth: 5,
      borderColor: GlobalStyles.color.purple
    }
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
