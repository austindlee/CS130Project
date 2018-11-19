import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import BottomButton from '../components/BottomButton';
import GlobalStyles from '../globals/GlobalStyles';
import { joinGroup } from '../utils/firebase/GroupsUtils';
import * as Expo from 'expo';

class JoinGroupScreen extends React.Component {
  static navigationOptions = {
    title: 'Join a Group',
    headerStyle: {
      backgroundColor: GlobalStyles.color.purple,
    },
    headerTintColor: '#fff'
  };
  constructor(props: any) {
    super(props);

    this.checkGroupNumber = this.checkGroupNumber.bind(this);
    this.state = {
      text: '',
      wrongGroupCode: false,
      loading: false
    }
  }

  async checkGroupNumber() {
    console.log('submit text');
    this.setState({loading: true});
    let userID = await Expo.SecureStore.getItemAsync('localUserID');
    let validGroup = await joinGroup(userID, this.state.text);

    if(validGroup) {
      console.log('write code');
      this.props.navigation.navigate('GroupListScreen', {refreshProps: true});
    } else {
      this.setState({wrongGroupCode: true, loading: false});
    }
  }

  render(){
    let questionText = 'What\'s the group number?';
    if(this.state.wrongGroupCode) {
      questionText = 'Can\'t find that number, please try again';
    }

    let textInputOrLoading =
      <TextInput
        placeholder='Enter group number'
        maxLength={9}
        onChangeText={(text)=> this.setState({text})}
        onSubmitEditing={this.checkGroupNumber}
        keyboardType='numeric'
        style={[GlobalStyles.fontFamily.primaryFontBold, GlobalStyles.fontSize.large, GlobalStyles.textColor.purple]}
      />;

    if(this.state.loading) {
      textInputOrLoading = <ActivityIndicator size='large'/>
    }

    return(
      <KeyboardAvoidingView style={styles.container}>
        <Text style={[GlobalStyles.fontFamily.primaryFontBold, GlobalStyles.fontSize.large, GlobalStyles.textColor.purple]}>{questionText}</Text>
        {textInputOrLoading}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10
  }
});

export default JoinGroupScreen
