import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';

export default function createUser(username: string) {
    const db = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    db.settings(settings);
    db.collection('users').add({
        username
    })
}

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
