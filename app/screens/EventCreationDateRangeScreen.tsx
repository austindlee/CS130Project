import React from 'react';
import { FlatList, ActivityIndicator, Text, Picker } from 'react-native';
import GroupCard from '../components/GroupCard';
import { getUsersGroups } from '../utils/firebase/UserUtils';
import { getGroupInfo } from '../utils/firebase/GroupsUtils';
import * as Expo from 'expo';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import DatePicker from 'react-native-datepicker';

// THIS WILL BE THE GROUP SPECIFIC PAGE
// PASSES OUT GROUP ID
type EventCreationDateRangeScreenProps = {
  refreshProps?: boolean
}

type EventCreationDateRangeScreenState = {
  groupData: any,
  isLoading: boolean
}

class EventCreationDateRangeScreen extends React.Component<EventCreationDateRangeScreenProps, EventCreationDateRangeScreenState, {}> {
  constructor(props) {
    super(props);
    this.constructOptions = this.constructOptions.bind(this);
    var date = new Date();
    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                        .toISOString()
                        .split("T")[0];
    this.state = {
      groupData: [],
      currentDate: dateString,
      earliestDate: dateString,
      latestDate: dateString,
      selectedHours: 0,
      selectedMinutes: 0,
      isLoading: true
    };
  }

  async componentDidMount() {
    let userID = await Expo.SecureStore.getItemAsync('localUserID');
    let groupIDArray = await getUsersGroups(userID);
    let groupArrayPromises = groupIDArray.map(async (groupID) => {
      return await getGroupInfo(groupID);
    })
    const groupArray = await Promise.all(groupArrayPromises);
    this.setState({groupData: groupArray, isLoading: false});
  }

  async componentWillReceiveProps(nextProps) {
    if(nextProps.navigation.state.params.refreshProps) {
      this.setState({isLoading: true});
      let userID = await Expo.SecureStore.getItemAsync('localUserID');
      let groupIDArray = await getUsersGroups(userID);
      //  use  map?
      let groupArrayPromises= groupIDArray.map(async (groupID) => {
        return await getGroupInfo(groupID);
      })
      const groupArray = await Promise.all(groupArrayPromises);
      this.setState({groupData: groupArray, isLoading: false});
    }
  }

  static navigationOptions = {
    title: 'Date Range',
  };

  constructOptions(numOptions: number) {
    var options = [];
    for (var i = 0; i < numOptions; i++) {
      options.push(<Picker.Item label={i.toString()} value={i} />);
    }
    return options;
  }

  render() {
    let loadingIndicator;
    if(this.state.isLoading) {
      loadingIndicator = <ActivityIndicator size='large'/>
    }
    return (
      <ButtonScreenTemplate
        bottomButtonText='Next'
        bottomButtonFunction={()=> this.props.navigation.navigate('EventCreationOptionsScreen',
          {
            timeOfDay: this.props.navigation.state.params.timeOfDayNumber,
            earliestDate: this.state.earliestDate,
            latestDate: this.state.latestDate,
            hours: this.state.selectedHours,
            minutes: this.state.selectedMinutes,
          }
        )}
      >
        <Text>
          Earliest Date
        </Text>
        {loadingIndicator}
        <DatePicker
          style={{width: 200}}
          date={this.state.earliestDate}
          mode="date"
          placeholder="Earliest Date"
          format="YYYY-MM-DD"
          minDate={this.state.currentDate}
          maxDate="2020-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {this.setState({earliestDate: date})}}
        />
        <Text>
          Latest Date
        </Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.latestDate}
          mode="date"
          placeholder="Latest Date"
          format="YYYY-MM-DD"
          minDate={this.state.currentDate}
          maxDate="2020-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {this.setState({latestDate: date})}}
        />
        <Text>
          Length of event
        </Text>
        <Text>
          Hours
        </Text>
        <Picker
          selectedValue={this.state.selectedHours}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedHours: itemValue})}>
          {this.constructOptions(7)}
        </Picker>
        <Text>
          Minutes
        </Text>
        <Picker
          selectedValue={this.state.selectedMinutes}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({selectedMinutes: itemValue})}>
          {this.constructOptions(60)}
        </Picker>
        <Text>
          {this.state.earliestDate}
        </Text>
        <Text>
          {this.state.latestDate}
        </Text>
        <Text>
          {this.state.selectedHours}
        </Text>
        <Text>
          {this.state.selectedMinutes}
        </Text>
      </ButtonScreenTemplate>
    );
  }
}

export default EventCreationDateRangeScreen
