import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import firebase from 'firebase';

export default function createGroup({PARAMS}) {
  firebase.database().ref('Groups/').push({
    // Group info
  }).then((data)=>{
      //success callback
      console.log('data ' , data)
  }).catch((error)=>{
      //error callback
      console.log('error ' , error)
  })
}

export default function addUserToGroup({UserID, GroupID}) {
}

export default function deleteGroup({GroupID}) {
}

export default function getUsersInGroup({GroupID}) {
}
