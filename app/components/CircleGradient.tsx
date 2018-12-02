import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import { LinearGradient } from 'expo';

type CircleGradientProps  = {
  /** First color in the gradient */
  color1: string,
  /** Second color in the gradient */
  color2: string,
  /** What text should be displayed the circle */
  text?: string
  /** What action should be performed when the circle is pressed */
  onPress: any,
  /** Specifies if the gradient is currently pressed */
  isPressed: boolean
}

/**
 * Displays a profile photo given by a URL, or a default profile photo
 */
class CircleGradient extends React.Component<CircleGradientProps> {
  constructor(props: CircleGradientProps) {
    super(props);
  }

  render() {
    let renderOpacity = this.props.isPressed ? styles.pressedOpacity : styles.unpressedOpacity;
    console.log('this is the fuct')
    console.log(this.props.onPress)
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.centerText}
      >
        <LinearGradient
          colors= {[this.props.color1, this.props.color2]}
          style={[styles.container, renderOpacity]}
          start={[0,0]}
          end={[1,1]}
        />
        <Text
          style={[
            GlobalStyles.color.black,
            GlobalStyles.fontSize.small,
            GlobalStyles.fontFamily.primaryFontBold,
          ]}
        >{this.props.text ? this.props.text : ''}</Text>
      </TouchableOpacity>
    )
  }
}

export default CircleGradient

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  centerText: {
    alignItems: 'center',
    width: 120
  },
  pressedOpacity: {
    opacity: 0.35
  },
  unpressedOpacity: {
    opacity: 1.0
  }
})
