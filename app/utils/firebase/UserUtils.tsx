import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';

/**
 * Creates a user document in the Firestore no-sql database and returns the unique userID
 * @param username - username - name of the user
 */
export default async function createUser(username: string) {
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
 * Returns an array of groups that a user is in
 * @param userID - userID - takes a unique user ID to identify the user
 */
export default function getUsersGroups(userID: number) {
    // initialize Firestore
    const db = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    db.settings(settings);

    // add each group from user's group subcollection to array
    var groups : string[] = [];
    db.collection('users').doc(userID).collection('groups').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            groups.push(doc.id);
        });
    })
    return groups;
}

// export default function deleteUser(userID: number) {

// }
