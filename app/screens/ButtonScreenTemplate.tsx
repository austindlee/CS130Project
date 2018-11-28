import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import GlobalStyles from '../globals/GlobalStyles';

type ButtonScreenTemplateProps = {
  /** Text that should be displayed on the top button */
  topButtonText?: string,
  /** Function that should be called when top button onPress */
  topButtonFunction?: Function,
  /** Text that should be displayed on the bottom/only button (filled button) */
  bottomButtonText: string,
  /** Function that should be called on the bottom/only button onPress */
  bottomButtonFunction: Function
  /** Dark mode gives the view a purple background */
  darkBackground?: boolean
  /** Centered mode centers the buttons within the view */
  centeredButtons?: boolean
}

class ButtonScreenTemplate extends React.Component<ButtonScreenTemplateProps> {
  constructor(props: ButtonScreenTemplateProps) {
    super(props);
    this.backgroundColorStyle = this.backgroundColorStyle.bind(this);
    this.centeredStyleJustify = this.centeredStyleJustify.bind(this);
    this.centeredStyleFlex = this.centeredStyleFlex.bind(this);
    this.buttonContainerHeight = this.buttonContainerHeight.bind(this);
  }

  private backgroundColorStyle(): Object {
    return (this.props.darkBackground? {backgroundColor: GlobalStyles.color.purple}: {backgroundColor: GlobalStyles.color.white});
  }

  private centeredStyleJustify(): Object {
    return (this.props.centeredButtons ? {justifyContent: 'center'} : {justifyContent: 'space-between'});
  }

  private centeredStyleFlex(): Object {
    return (this.props.centeredButtons ? {} : {flex: 1});
  }

  private buttonContainerHeight(): Object {
    return (this.props.topButtonText ? {height: 130} : {height: 60});
  }

  render() {
    let topButton;
    if(this.props.topButtonText || this.props.topButtonFunction) {
      topButton = <BottomButton
        buttonAction={this.props.topButtonFunction}
        buttonText={this.props.topButtonText ? this.props.topButtonText : ''}
        buttonFilled={false}
        />
    }
    return (
      <View style={[styles.container, this.centeredStyleJustify(), this.backgroundColorStyle()]}>
        <View style={this.centeredStyleFlex()}>
          {this.props.children}
        </View>
        <View style={[styles.buttonContainer, this.buttonContainerHeight()]}>
          {topButton}
          <BottomButton
            buttonAction={this.props.bottomButtonFunction}
            buttonText={this.props.bottomButtonText}
            buttonFilled={this.props.darkBackground? false: true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 0
  },
  lastButtonMargin: {
    marginTop: 10
  },
  buttonContainer: {
    alignSelf: 'stretch'
  }
});

export default ButtonScreenTemplate
