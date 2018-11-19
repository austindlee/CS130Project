import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import firebase from 'firebase';
import randInt from '../FirebaseUtils';
import 'firebase/firestore';

/**
 * Function that creates a new group and stores it in firestore
 * @param groupName will be the name of the new group, it is a string
 * @param creator is the userID: string of the person who created the group and will be the first member of the group
 * @return a nine digit passcode - int that will allow other users to join that group
 */
export async function createGroup(groupName: string, creator: string) {
  const db = firebase.firestore();
  const settings = {
      timestampsInSnapshots: true
  };

  db.settings(settings);
  var passcode = randInt(100000000,999999999);

  await db.collection('users').doc(creator).update({
    groups: firebase.firestore.FieldValue.arrayUnion(passcode)
  });

  var users = [];
  users.push(creator);
  await db.collection('groups').doc(passcode.toString()).set({
    name: groupName,
    users: users
  })
  return passcode;
}

/**
 * Function that adds a user to a group and stores it in firestore
 * @param userID is the new group member, it is a string
 * @param groupID is the groupID: string that is adding userID member to the group
 * @return a boolean representing if the user was added to the group
 */
export async function joinGroup(userID: string, groupID: string) {
  const db = firebase.firestore();
  const settings = {
      timestampsInSnapshots: true
  };
  db.settings(settings);
  var users = [];
  await db.collection('groups').doc(groupID).get().then(function(doc) {
    if(doc.exists) {
      users = doc.data().users;
      users.push(userID);
      db.collection('groups').doc(groupID).update({
        users: users
      });
    } else {
      console.log('Document does not exist');
      return false;
    }
  }).catch(function(error) {
    console.log('Could not grab group based on groupID');
    return false;
  });

  await db.collection('users').doc(userID).update({
    groups: firebase.firestore.FieldValue.arrayUnion(groupID)
  });
  return true;
}

export async function getGroupInfo(groupID: string) {
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  }
}
