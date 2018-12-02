import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import CircleGradient from './CircleGradient';

class TimePicker extends React.Component {
  constructor(props: any) {
    super(props);

    this.getCurrentlySelected = this.getCurrentlySelected.bind(this);
    this.handlePress = this.handlePress.bind(this);

    this.state = {
      currentlySelected: -1,
      timeOfDay: [{
        name: 'Morning',
        gradient: GlobalStyles.gradients.morning,
        selected: 0
      },
      {
        name: 'Afternoon',
        gradient: GlobalStyles.gradients.afternoon,
        selected: 0
      },
      {
        name: 'Night',
        gradient: GlobalStyles.gradients.night,
        selected: 0
      },
      {
        name: 'Late Night',
        gradient: GlobalStyles.gradients.latenight,
        selected: 0
      }]
    }
  }

  /**
   * Internal function used to reset the currently selected time
   * NOTE: this functionality can probably be passed up to the screen
   * @param dayNumber
   */
  handlePress(dayNumber: number) {
    this.setState({currentlySelected: dayNumber})
  }

  /**
   * Returns the currently selected index
   */
  getCurrentlySelected(): number {
    return this.state.currentlySelected;
  }

  render() {
    let icons = this.state.timeOfDay.map((timeObject, i: number) => {
      console.log('hi')
      return <CircleGradient
        text={timeObject.name}
        color1={timeObject.gradient[0]}
        color2={timeObject.gradient[1]}
        onPress={() => this.handlePress(i)}
        isPressed={i === this.getCurrentlySelected()}
        />
    })
    return(
      <View style={styles.container}>
        {icons}
      </View>
    )
  }
}

export default TimePicker

const styles = StyleSheet.create({
  container: {
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  }
})
