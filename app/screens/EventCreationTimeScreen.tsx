import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import * as Expo from 'expo';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import TimePicker from '../components/TimePicker';
type EventCreationTimeScreenState = {
  isLoading: boolean
}

class EventCreationTimeScreen extends React.Component<EventCreationTimeScreenState, {}> {
  constructor(props) {
    super(props);
    this.selectTimeOfDayButton = this.selectTimeOfDayButton.bind(this);

    this.state = {
      isLoading: true,
      timeOfDayNumber: 0,
    };
  }

  selectTimeOfDayButton(dayNumber: number) {
    this.setState({timeOfDayNumber: dayNumber});
  }

  async componentDidMount() {
    this.setState({isLoading: false});
  }

  static navigationOptions = {
    title: 'Time of day',
  };

  render() {
    let loadingIndicator;
    if(this.state.isLoading) {
      loadingIndicator = <ActivityIndicator size='large'/>
    }
    return (
      <ButtonScreenTemplate
        bottomButtonText='Next'
        bottomButtonFunction={()=> this.props.navigation.navigate('EventCreationDateRangeScreen', {
          timeOfDayNumber: this.state.timeOfDayNumber,
          groupName: this.props.navigation.state.params.groupName,
          groupId: this.props.navigation.state.params.groupId,
        })}
      >
        <View style={styles.background}>
          {loadingIndicator}
          <TimePicker
            onSelectButton={this.selectTimeOfDayButton}
          >
          </TimePicker>
        </View>
      </ButtonScreenTemplate>
    );
  }
}

const styles = StyleSheet.create(
  {
    background: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: '#fff',
    }
  }
);

export default EventCreationTimeScreen
