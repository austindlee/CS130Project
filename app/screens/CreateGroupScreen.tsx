import React from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import GroupCard from '../components/GroupCard';
import { StackActions, NavigationActions } from 'react-navigation';

class CreateGroupScreen extends React.Component {
  constructor(props: any) {
    super(props);

    this.submitGroupName = this.submitGroupName.bind(this);
    this.state = {
      text: ''
    }
  }

  submitGroupName(): void {
    console.log('submit text');

    // TODO: Replace this with submitting group name
    // state while its loading with an indicator

    this.props.navigation.navigate('GroupListScreen');
  }

  render(){
    return(
      <View>
        <Text>What's the name?</Text>
        <TextInput
          placeholder='Enter group name'
          maxLength={40}
          onChangeText={(text)=> this.setState({text})}
          onSubmitEditing={this.submitGroupName}
        />
      </View>
    )
  }
}

export default CreateGroupScreen
