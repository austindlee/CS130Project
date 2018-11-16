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
 * @return - an array of groups that the user is currently a part of 
 */
export async function getUsersGroups(userID: number) {
    // initialize Firestore
    const db = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    db.settings(settings);

    // add each group from user's group subcollection to array
    var groups : string[] = [];
    await db.collection('users').doc(userID).collection('groups').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            groups.push(doc.id);
        });
    })
    return groups;
}

// export default function deleteUser(userID: number) {

// }
