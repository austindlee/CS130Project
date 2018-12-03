import React from 'react';
import { StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import CircleGradient from './CircleGradient';

type ColorPickerProps = {
  /** Function that should be called when a button is pressed */
  onCirclePress: Function
}

/**
 * Component used to pick a custom color when creating a group
 */
class ColorPicker extends React.Component<ColorPickerProps> {
  constructor(props: ColorPickerProps) {
    super(props);

    this.getCurrentlySelected = this.getCurrentlySelected.bind(this);
    this.handlePress = this.handlePress.bind(this);

    this.state = {
      currentlySelected: 0,
      colors: []
    }
  }

  /**
   * Internal function used to reset the currently selected time
   * NOTE: this functionality can probably be passed up to the screen
   * @param dayNumber
   */
  handlePress(dayNumber: number) {
    this.setState({currentlySelected: dayNumber})
    this.props.onCirclePress(dayNumber);
  }

  /**
   * Returns the currently selected index
   */
  getCurrentlySelected(): number {
    return this.state.currentlySelected;
  }

  render() {
    let icons = GlobalStyles.gradientsArray.map((colorObject, i: number) => {
      console.log('hi')
      return <CircleGradient
        color1={colorObject[0]}
        color2={colorObject[1]}
        onPress={() => this.handlePress(i)}
        isPressed={i === this.getCurrentlySelected()}
        />
    })
    return(
      <ScrollView
        horizontal={true}
        style={styles.container}
      >
        {icons}
      </ScrollView>
    )
  }
}

export default ColorPicker

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 70
  },
  marginBetweenCircles: {
    marginRight: 10
  },
})
