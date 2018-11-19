import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, ActivityIndicator, Share } from 'react-native';
import BottomButton from '../components/BottomButton';
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
      <View style={styles.container}>
        <Text style={[GlobalStyles.fontFamily.primaryFontBold, GlobalStyles.fontSize.large, GlobalStyles.textColor.purple]}>Your group code is: </Text>
        <Text style={[GlobalStyles.fontFamily.primaryFontBold, GlobalStyles.fontSize.large, GlobalStyles.textColor.purple]}>{this.props.navigation.getParam('groupCode', 0)}</Text>
      <BottomButton
        buttonText='Share the code'
        buttonAction={() => Share.share({message: shareMessage})}
        buttonFilled={false}
      />
      <BottomButton
        buttonText='Return home'
        buttonAction={() => this.props.navigation.navigate('GroupListScreen', {refreshProps: true})}
        buttonFilled={true}
      />
      </View>
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
