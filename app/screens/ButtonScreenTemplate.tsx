import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import * as Expo from 'expo';

type ButtonScreenTemplateProps = {
  /** Text that should be displayed on the top button */
  topButtonText?: string,
  /** Function that should be called when top button onPress */
  topButtonFunction?: Function,
  /** Text that should be displayed on the bottom/only button (filled button) */
  bottomButtonText: string,
  /** Function that should be called on the bottom/only button onPress */
  bottomButtonFunction: Function
}

class ButtonScreenTemplate extends React.Component<ButtonScreenTemplateProps> {
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
      <View style={styles.container}>
        <View style={styles.listContainer}>
          {this.props.children}
        </View>
        <View style={styles.buttonActions}>
          {topButton}
          <BottomButton
            buttonAction={this.props.bottomButtonFunction}
            buttonText={this.props.bottomButtonText}
            buttonFilled={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 0,
    justifyContent: 'space-between'
  },
  lastButtonMargin: {
    marginTop: 10
  },
  buttonActions: {
    height: 130,
    alignSelf: 'stretch',
  },
  listContainer: {
    flex: 1
  }
});

export default ButtonScreenTemplate
