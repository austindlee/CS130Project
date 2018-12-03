import React from 'react';
import { FlatList, ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import * as Expo from 'expo';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import GlobalStyles from '../globals/GlobalStyles';

type EventCreationConfirmationScreenState = {
  isLoading: boolean
}

class EventCreationConfirmationScreen extends React.Component<EventCreationConfirmationScreenState, {}> {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    this.setState({isLoading: false});
  }

  static navigationOptions = {
    title: 'Event Created!',
  };

  render() {
    let loadingIndicator;
    if(this.state.isLoading) {
      loadingIndicator = <ActivityIndicator size='large'/>
    }
    let queryInfo = this.props.navigation.state.params;
    return (
      <ButtonScreenTemplate
        bottomButtonText='Go Back'
        bottomButtonFunction={()=> this.props.navigation.navigate('GroupListScreen', {refreshProps: true})}
      >
        <View style={styles.background}>
          <Text style={[GlobalStyles.fontSize.large, GlobalStyles.textColor.black, GlobalStyles.fontFamily.primaryFontBold]}>
            {"You have successfully created your event!"}
          </Text>
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

export default EventCreationConfirmationScreen
