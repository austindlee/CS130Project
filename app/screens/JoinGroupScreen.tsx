import React from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import GroupCard from '../components/GroupCard';
import { StackActions, NavigationActions } from 'react-navigation';

class JoinGroupScreen extends React.Component {
  constructor(props: any) {
    super(props);

    this.checkGroupNumber = this.checkGroupNumber.bind(this);
    this.state = {
      text: ''
    }
  }

  checkGroupNumber(): void {
    console.log('submit text');

    // TODO: Replace this with submitting group name
    // state while its loading with an indicator

    this.props.navigation.navigate('GroupListScreen');
  }

  render(){
    return(
      <View>
        <Text>What's the group number?</Text>
        <TextInput
          placeholder='Enter group number'
          maxLength={6}
          onChangeText={(text)=> this.setState({text})}
          onSubmitEditing={this.checkGroupNumber}
          keyboardType='numeric'
        />
      </View>
    )
  }
}

export default JoinGroupScreen
