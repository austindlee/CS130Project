import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';

/**
 * Creates a user document in the Firestore no-sql database
 * @param username - name of the user
 * @return - the unique userID of the newly created user
 */
export async function createUser(username: string) {
  // initialize Firestore
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);

  // add user to collection
  return await db.collection('users').add({
    username
  })
}

/**
 * Gets the groups that a user is currently a part of
 * @param userID - takes a unique user ID to identify the user
 * @return - an array of group IDs that the user is currently a part of
 */
export async function getUsersGroups(userID: string) {
  // initialize Firestore
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);

  // add each group from user's group subcollection to array
  let groups : string[] = [];
  await db.collection('users').doc(userID).get().then((doc) => {
    if(doc.exists) {
      doc.data().groups.forEach((groupId: string) => {
        groups.push(groupId);
      })
    }
    else {
      console.log("Can't find user");
    }
  });
  return groups;
}

// export default function deleteUser(userID: number) {

// }
