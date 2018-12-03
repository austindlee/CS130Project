import React from 'react';
import { FlatList, ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import * as Expo from 'expo';
import ButtonScreenTemplate from './ButtonScreenTemplate';
import GlobalStyles from '../globals/GlobalStyles';
import { removeFromGroup } from '../utils/firebase/GroupsUtils';

type LeaveGroupScreenState = {
  isLoading: boolean
}

class LeaveGroupScreen extends React.Component<LeaveGroupScreenState, {}> {
  constructor(props) {
    super(props);
    this.leaveGroup = this.leaveGroup.bind(this);
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    this.setState({isLoading: false});
  }

  async leaveGroup(): void {
    let userID = await Expo.SecureStore.getItemAsync('localUserID');
    removeFromGroup(userID, this.props.navigation.state.params.groupId);
    this.props.navigation.navigate('ConfirmLeftGroupScreen', {groupName: this.props.navigation.state.params.groupName});
  }

  static navigationOptions = {
    title: 'Leave group',
  };

  render() {
    let loadingIndicator;
    if(this.state.isLoading) {
      loadingIndicator = <ActivityIndicator size='large'/>
    }
    let queryInfo = this.props.navigation.state.params;
    return (
      <ButtonScreenTemplate
        bottomButtonText='Confirm Leave'
        bottomButtonFunction={this.leaveGroup}
      >
        <View style={styles.background}>
          <Text style={[GlobalStyles.fontSize.large, GlobalStyles.textColor.black, GlobalStyles.fontFamily.primaryFontBold]}>
            {"Are you sure you want to leave group"}
          </Text>
          <Text style={[GlobalStyles.fontSize.large, GlobalStyles.textColor.purple, GlobalStyles.fontFamily.primaryFontBold]}>
            {queryInfo.groupName}
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

export default LeaveGroupScreen
