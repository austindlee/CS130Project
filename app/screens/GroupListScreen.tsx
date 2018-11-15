import React from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import BottomButton from '../components/BottomButton';
import GroupCard from '../components/GroupCard';
import { createStackNavigator } from 'react-navigation';

type GroupListScreenState = {
  testData: any,
  isLoading: boolean
}
class GroupListScreen extends React.Component<{}, GroupListScreenState, {}> {
  constructor(props) {
    super(props);

    this.state = {
      testData: [{
        key: '0',
        groupName: 'Test Group 1',
      },
      {
        key: '1',
        groupName: 'Test Group 2'
      }],
      isLoading: false
    };
  }

  static navigationOptions = {
    title: 'Group List Screen',
  };

  render() {
    return (
      <View>
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.testData}
            renderItem={({item}) => <GroupCard groupName={item.groupName}></GroupCard>}
          />
        </View>
        <View style={styles.buttonActions}>
          <BottomButton
            buttonAction={()=> this.props.navigation.navigate('CreateGroupScreen')}
            buttonText='Create Group'
            buttonFilled={false}
          />
          <BottomButton
            buttonAction={()=> this.props.navigation.navigate('JoinGroupScreen')}
            buttonText='Join Group'
            buttonFilled={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActions: {
    flex: 1
  },
  listContainer: {

  }
});

export default GroupListScreen
