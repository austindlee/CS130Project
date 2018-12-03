import React from 'react';
import { FlatList, ActivityIndicator, Text, Picker, StyleSheet, View, Dimensions, TextInput } from 'react-native';
import * as Expo from 'expo';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import DatePicker from 'react-native-datepicker';

type EventCreationDateRangeScreenState = {
  isLoading: boolean
}

class EventCreationDateRangeScreen extends React.Component<EventCreationDateRangeScreenState, {}> {
  constructor(props) {
    super(props);
    this.constructOptions = this.constructOptions.bind(this);
    var date = new Date();
    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                        .toISOString()
                        .split("T")[0];
    this.state = {
      currentDate: dateString,
      earliestDate: dateString,
      latestDate: dateString,
      description: "",
      selectedHours: 0,
      selectedMinutes: 0,
      isLoading: false
    };
  }

  static navigationOptions = {
    title: 'Specifications',
  };

  constructOptions(numOptions: number) {
    var options = [];
    for (var i = 0; i < numOptions; i++) {
      options.push(<Picker.Item label={i.toString()} value={i} key={numOptions + "-" + i}/>);
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
            groupName: this.props.navigation.state.params.groupName,
            groupId: this.props.navigation.state.params.groupId,
            timeOfDay: this.props.navigation.state.params.timeOfDayNumber,
            earliestDate: this.state.earliestDate,
            latestDate: this.state.latestDate,
            hours: this.state.selectedHours,
            minutes: this.state.selectedMinutes,
            description: this.state.description,
          }
        )}
      >
        <View style={styles.background}>
          {loadingIndicator}
          <View styles={styles.section}>
            <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.textColor.purple, GlobalStyles.fontFamily.primaryFontBold, styles.header]}>
              Event Description
            </Text>
            <TextInput
              placeholder='Enter description'
              maxLength={30}
              onChangeText={(text)=> this.setState({description: text})}
              returnKeyType='done'
              style={[GlobalStyles.fontFamily.primaryFontBold, GlobalStyles.fontSize.medium, GlobalStyles.textColor.black]}
            />
          </View>
          <View styles={styles.section}>
            <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.textColor.purple, GlobalStyles.fontFamily.primaryFontBold, styles.header]}>
              Earliest Date
            </Text>
            <DatePicker
              style={{width: Dimensions.get('window').width}}
              date={this.state.earliestDate}
              mode="date"
              placeholder="Earliest Date"
              format="YYYY-MM-DD"
              minDate={this.state.currentDate}
              maxDate="2020-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{dateInput:{borderWidth: 0}}}
              onDateChange={(date) => {this.setState({earliestDate: date})}}
            />
          </View>
          <View styles={styles.section}>
            <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.textColor.purple, GlobalStyles.fontFamily.primaryFontBold, styles.header]}>
              Latest Date
            </Text>
            <DatePicker
              style={{width: Dimensions.get('window').width}}
              date={this.state.latestDate}
              mode="date"
              placeholder="Latest Date"
              format="YYYY-MM-DD"
              minDate={this.state.currentDate}
              maxDate="2020-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{dateInput:{borderWidth: 0}}}
              showIcon={false}
              onDateChange={(date) => {this.setState({latestDate: date})}}
            />
          </View>
          <View styles={styles.section}>
            <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.textColor.purple, GlobalStyles.fontFamily.primaryFontBold, styles.header]}>
              Hours
            </Text>
            <Picker
              selectedValue={this.state.selectedHours}
              style={{ height: 50}}
              onValueChange={(itemValue, itemIndex) => this.setState({selectedHours: itemValue})}>
              {this.constructOptions(7)}
            </Picker>
          </View>
          <View styles={styles.section}>
            <Text style={[GlobalStyles.fontSize.medium, GlobalStyles.textColor.purple, GlobalStyles.fontFamily.primaryFontBold, styles.header]}>
              Minutes
            </Text>
            <Picker
              selectedValue={this.state.selectedMinutes}
              style={{ height: 50}}
              onValueChange={(itemValue, itemIndex) => this.setState({selectedMinutes: itemValue})}>
              {this.constructOptions(60)}
            </Picker>
          </View>
        </View>
      </ButtonScreenTemplate>
    );
  }
}

const styles = StyleSheet.create(
  {
    background: {
      justifyContent: "space-around",
      alignSelf: "stretch",
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      textAlign: "left",
    },
    section: {
      alignItems: "center",
    }
  }
);
export default EventCreationDateRangeScreen
