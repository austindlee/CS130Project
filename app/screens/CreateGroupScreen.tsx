import React from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import GroupCard from '../components/GroupCard';
import { StackActions, NavigationActions } from 'react-navigation';
import GlobalStyles from '../globals/GlobalStyles';

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
      <View style={styles.container}>
        <Text style={GlobalStyles.groupText}>What's the name?</Text>
        <TextInput
          placeholder='Enter group name'
          maxLength={40}
          onChangeText={(text)=> this.setState({text})}
          onSubmitEditing={this.submitGroupName}
          style={GlobalStyles.groupText}

        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default CreateGroupScreen
