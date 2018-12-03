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
 * @param color the color enum associated with the group
 * @return a nine digit passcode - int that will allow other users to join that group
 */
export async function createGroup(groupName: string, creator: string, color: number) {
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
    users: users,
    color: color
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
  db.settings(settings);

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

/**
 * Function that removes a user from a group
 * @param groupID will be the name of the group to remove user from
 * @param user is the userID: string of the person who wants to be removed from group
 * @return boolean stating if it is successful, updates the both group and user collections
 *        so that they no longer hold each other (i.e. user's groups array has removed the group from itself)
 */
export async function removeFromGroup(userID: string, groupID: string) {
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);
  try {
    let doc = await db.collection('users').doc(userID).get();
    if(doc.exists) {
      let resultingArray = doc.data().groups.filter(group => group != groupID);
      db.collection('users').doc(userID).update({
        groups: resultingArray
      });
    }
  } catch(err) {
    return false;
  }
  try {
    let doc = await db.collection('groups').doc(groupID).get();
    if(doc.exists) {
      let resultingArray = doc.data().users.filter(user => user != userID);
      db.collection('groups').doc(groupID).update({
        users: resultingArray
      });
      return true;
    }
  } catch(err) {
    return false;
  }
}

/**
 * Adds an event to a group
 * @param groupId will be the name of the group to add the event to
 * @param event is an object that represents info about the event being added
 * @return boolean stating if it is successful, adds an event to the group
 */
export async function addEventToGroup(groupID: string, event: any) {
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
        events: firebase.firestore.FieldValue.arrayUnion(event)
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
 * Helper function that grabs the list of events associated with the group
 * @param groupId will be the name of the group to query events from
 * @return an array of objects that represent events the group has created
 */
export async function getEventsFromGroup(groupID: string) {
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
      // console.log(doc.data().events);
      return doc.data().events;
    } else {
      return false;
    }
  } catch (err) {
    console.log('Could not grab group based on groupID');
    return false;
  }
}
