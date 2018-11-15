import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import firebase from 'firebase';

export default function createUser(name: string) {
  firebase.database().ref('Users/').push({
      name
  }).then((data)=>{
      //success callback
      console.log('data ' , data)
  }).catch((error)=>{
      //error callback
      console.log('error ' , error)
  })
}


export default function getUsersGroups({USERID}) {
}

export default function getUsersCalendarID({USERID}) {
}
