import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, ActivityIndicator, Share, Button } from 'react-native';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import GlobalStyles from '../globals/GlobalStyles';

class JoinGroupScreen extends React.Component {
  static navigationOptions = {
    title: 'Share your code',
    headerStyle: {
      backgroundColor: GlobalStyles.color.purple,
    },
    headerTintColor: '#fff'
  };

  render(){
    const shareMessage = 'Join my PlanIt Group! The code is: ' + this.props.navigation.getParam('groupCode', 0);
    return(
      <ButtonScreenTemplate
        bottomButtonText='Return home'
        bottomButtonFunction={() => this.props.navigation.navigate('GroupListScreen', {refreshProps: true})}
        topButtonText='Share the code'
        topButtonFunction={() => Share.share({message: shareMessage})}
      >
        <Text style={[GlobalStyles.fontFamily.primaryFontBold, GlobalStyles.fontSize.large, GlobalStyles.textColor.purple]}>Your group code is: </Text>
        <Text style={[GlobalStyles.fontFamily.primaryFontBold, GlobalStyles.fontSize.large, GlobalStyles.textColor.purple]}>{this.props.navigation.getParam('groupCode', 0)}</Text>
      </ButtonScreenTemplate>
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
