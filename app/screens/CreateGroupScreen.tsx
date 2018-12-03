import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, ActivityIndicator } from 'react-native';
import ButtonScreenTemplate from './ButtonScreenTemplate'
import GlobalStyles from '../globals/GlobalStyles';
import * as Expo from 'expo';
import { createGroup } from '../utils/firebase/GroupsUtils';
import ColorPicker from '../components/ColorPicker';

class CreateGroupScreen extends React.Component {
  static navigationOptions = {
    title: 'Create a Group',
    headerStyle: {
      backgroundColor: GlobalStyles.color.purple,
    },
    headerTintColor: '#fff'
  };

  constructor(props: any) {
    super(props);

    this.submitGroupName = this.submitGroupName.bind(this);
    this.handleColorPress = this.handleColorPress.bind(this);
    this.state = {
      text: '',
      isLoading: false,
      selectedColor: 0
    }
  }

  private handleColorPress(colorNumber: number) {
    this.setState({selectedColor: colorNumber})
  }

  async submitGroupName() {
    console.log('submit text');

    this.setState({isLoading: true});
    let currentUser = await Expo.SecureStore.getItemAsync('localUserID');
    let groupID = await createGroup(this.state.text, currentUser, this.state.selectedColor);
    // TODO: Replace this with submitting group name
    // state while its loading with an indicator

    this.props.navigation.navigate('ShareGroupScreen', {'groupCode': groupID});
  }

  render(){
    let textInputOrLoading =
      <TextInput
        placeholder='Enter group name'
        maxLength={40}
        onChangeText={(text)=> this.setState({text})}
        onSubmitEditing={this.submitGroupName}
        style={[GlobalStyles.fontFamily.primaryFontBold, GlobalStyles.fontSize.large, GlobalStyles.textColor.purple]}
      />;
    if(this.state.isLoading) {
      textInputOrLoading = <ActivityIndicator size='large'/>
    }

    return(
      <ButtonScreenTemplate
        bottomButtonText='Next'
        bottomButtonFunction={this.submitGroupName}
      >
        <Text style={[GlobalStyles.fontFamily.primaryFontBold, GlobalStyles.fontSize.large, GlobalStyles.textColor.purple]}>What do you want to name the group?</Text>
        {textInputOrLoading}
        <Text style={[GlobalStyles.fontFamily.primaryFontBold, GlobalStyles.fontSize.large, GlobalStyles.textColor.purple]}>Pick a group color</Text>
        <ColorPicker onCirclePress={this.handleColorPress} />
      </ButtonScreenTemplate>
    )
  }
}

export default CreateGroupScreen
