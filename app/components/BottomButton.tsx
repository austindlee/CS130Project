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
    this.buttonTextColor = this.buttonTextColor.bind(this);
    this.filledButtonStyle = this.filledButtonStyle.bind(this);
  }

  /**
   * Internal function that indicates whether button text should be black or white
   * @param isFilled whether or not the button is filled - passed in as a prop to higher level component
   * @return JSON object with appropriate CSS styling
   */
  private buttonTextColor(): Object {
    if(this.props.buttonFilled) {
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
  private filledButtonStyle(): Object {
    if(this.props.buttonFilled) {
      return {
        backgroundColor: GlobalStyles.color.purple,
        borderRadius: 25
      }
    } else {
      return {
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: GlobalStyles.color.purple
      }
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.buttonAction}
          style={[styles.button, this.filledButtonStyle(), GlobalStyles.dropShadow]}
        >
          <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.fontFamily.secondaryFontBold, this.buttonTextColor()]}>{this.props.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginTop: 10
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default BottomButton
