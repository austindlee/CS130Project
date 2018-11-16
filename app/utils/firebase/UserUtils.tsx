import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';

/**
 * Creates a user document in the Firestore no-sql database
 * @param username - username - name of the user
 */
export default async function createUser(username: string) {
    const db = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    db.settings(settings);
    await db.collection('users').add({
        username
    })
}

/**
 * Gets the groups that a user is in
 * @param userID - userID - takes a unique user ID to identify the user
 */
export default function getUsersGroups(userID: number) {
    const db = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    db.settings(settings);
    db.collection('users').doc(userID).collection('groups').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    })
}

// export default function deleteUser(userID: number) {

// }
