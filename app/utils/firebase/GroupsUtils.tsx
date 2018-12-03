import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import firebase from 'firebase';
import randInt from '../FirebaseUtils';
import 'firebase/firestore';

/**
 * Generates a unique nine digit code for group creation
 * @return string containing a nine digit code
 */
function generatePasscode(): string {
  let newPass = randInt(100000000,999999999).toString();
  return newPass;
}

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

  let isUniquePasscode = false;
  let passcode = '';
  while (!isUniquePasscode) {
    passcode = generatePasscode();
    let docRef = await db.collection('groups').doc(passcode).get();
    if(!docRef.exists)
      isUniquePasscode = true;
  }

  await db.collection('users').doc(creator).update({
    groups: firebase.firestore.FieldValue.arrayUnion(passcode)
  });

  let users = [];
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
  let users = [];

  try {
    let doc = await db.collection('groups').doc(groupID).get();
    if(doc.exists) {
      // This call can be blocking - no ned for async/await
      db.collection('groups').doc(groupID).update({
        users: firebase.firestore.FieldValue.arrayUnion(userID)
      });

      // This call can be blocking - no need for async/await
      db.collection('users').doc(userID).update({
        groups: firebase.firestore.FieldValue.arrayUnion(groupID)
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Could not grab group based on groupID');
    return false;
  }
}

/**
 * Function to retrieve a group and associated information
 * @param groupID A unique nine digit number representing the group
 * @return a JSON collection representing the group attributes
 */
export async function getGroupInfo(groupID: string) {
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  }

  try {
    let doc = await db.collection('groups').doc(groupID).get();
    if(doc.exists) {
      console.log(doc.data());
      return doc.data();
    } else {
      return null;
    }
  } catch (err) {
    console.log('Could not get group info based on groupID');
    return null;
  }
}

export async function removeFromGroup(userID: string, groupID: string) {
  const db = firebase.firestore();
  try {
    let doc = await db.collection('users').doc(userID).get();
    if(doc.exists) {
      let resultingArray = doc.data().groups.filter(group => group != groupID);
      db.collection('users').doc(userID).update({
        groups: resultingArray
      });
    }
  } catch(err) {
    return null;
  }
  try {
    let doc = await db.collection('groups').doc(groupID).get();
    if(doc.exists) {
      let resultingArray = doc.data().users.filter(user => user != userID);
      db.collection('groups').doc(groupID).update({
        users: resultingArray
      });
    }
  } catch(err) {
    return null;
  }
  // delete from user's groups
  // try {
  //   let doc = await db.collection('groups').doc(groupID).get();
  //   if(doc.exists) {
  //     // This call can be blocking - no ned for async/await
  //     db.collection('groups').doc(groupID).update({
  //       users: firebase.firestore.FieldValue.arrayUnion(userID)
  //     });
  //
  //     // This call can be blocking - no need for async/await
  //     db.collection('users').doc(userID).update({
  //       groups: firebase.firestore.FieldValue.arrayUnion(groupID)
  //     });
  //     return true;
  //   } else {
  //     return false;
  //   }
  // } catch (err) {
  //   console.log('Could not grab group based on groupID');
  //   return false;
  // }
  // try {
  //   let doc = await db.collection('users').doc(userID).get();
  //   if(doc.exists) {
  //     db.collection('users').doc(userID).update({
  //
  //     });
  //     return doc.data();
  //   } else {
  //     return null;
  //   }
  // } catch (err){
  //   console.log('Error removing user frmo group');
  //   return null;
  // }
  // // delete group group's users
  // try {
  //
  // } catch (err) {
  //   console.log('Could not leave group');
  //   return null;
  // }
}
