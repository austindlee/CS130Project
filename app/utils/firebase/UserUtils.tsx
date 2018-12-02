import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import GlobalStyles from '../globals/GlobalStyles';
import { Permissions, Notifications } from 'expo';
import firebase, { firestore } from 'firebase';
import 'firebase/firestore';

/**
 * Creates a user document in the Firestore no-sql database
 * @param username - name of the user
 * @return - the unique userID of the newly created user
 */
export async function createUser(username, userInfo) {
  // initialize Firestore
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let expoPushToken = await Notifications.getExpoPushTokenAsync();

  //userInfo object structure example
  /*Object {
     "accessToken": "ya29.GltiBnwIgzEhL9mjQPWfVEAzVeHaPGpxJzuZKn0Fyevl8c7cfTDKINYx8KYBeWinRiHZ2VTg_xj9z-pH7v0_h5OSuCknmqXJWTGIlPqPE2RQu_A-m0kaNCImGWop",
     "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2M2ZlNDgwYzNjNTgzOWJiYjE1ODYxZTA4YzMyZDE4N2ZhZjlhNTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5MDgyMjA5MDQwLWhsdnIzaDh1YzllOGJ1YWVqNW1waGd2NGxtdmlocHVmLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTA4MjIwOTA0MC1obHZyM2g4dWM5ZThidWFlajVtcGhndjRsbXZpaHB1Zi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwOTg4NDY3MDc3NzUzMTAwMzA0MSIsImVtYWlsIjoicGxhbml0LnRlc3QudWNsYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImJBVEpRa0tZeU1aWTNKZ2hjSEdRQ3ciLCJub25jZSI6IkhkMHdubXcteUJHRHVmXzhYclh4WFpTX3l4Wm1mbWNjNDVVUHRUZ0lMYXMiLCJuYW1lIjoiUGxhbiBJdCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLTZXV2tUMzJCYmljL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FHRGd3LWlYejFqY1hCRTdtVHVya0t1WkxVUUF5ZktRNGcvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IlBsYW4iLCJmYW1pbHlfbmFtZSI6Ikl0IiwibG9jYWxlIjoiZW4tR0IiLCJpYXQiOjE1NDM0NDU1NDAsImV4cCI6MTU0MzQ0OTE0MH0.OsAOXU0qAhCZoNoPVw66mWOj9KdWa6OsTl4GkAKbywHIJbT2XpB5u3hX-2RZGfp2lPsZiIYhIRpgeXewjdw64S6KpRjLR_Q1g9mB672-tYgvAbrIC8cSFPsocE87BbGZ64fs8m9Ua4VBciYd4FH4_LSrmOdkytD2VBM9II7E3NJqpa53YcjQ0zsOKITPsgMvQcZU9g9xhuPsezym2ynBc9AG5z2lKFi6Hm6dYP874EHqPNYbcXPzG7NXtWF9wKumOHEeeb5Qk6mlIvDbw28GXCgAU58hbx---gQ6BnBQJcd2q7QpjLC7xdBJUGe-neL3Q6Gp95qLkiUdr6UQO-ac8w",
     "refreshToken": "1/MsCymIZB169qQ8yMCpwFZKhUKLCTlAv2ywh81-Ew2pcC04-lIAmwXLT2wqT9ysea",
     "serverAuthCode": "4/pACJd9KLC1c52C93MgqJ9vZaP47lUBXgkDzcos9Zl3IeZ8b3oy02EvX4jJlQWgKHOyo7kv6Ol_E3k2BzsLI7OO0",
     "type": "success",
     "user": Object {
       "email": "planit.test.ucla@gmail.com",
       "familyName": "It",
       "givenName": "Plan",
       "id": "109884670777531003041",
       "name": "Plan It",
       "photoUrl": "https://lh3.googleusercontent.com/-6WWkT32Bbic/AAAAAAAAAAI/AAAAAAAAAAA/AGDgw-iXz1jcXBE7mTurkKuZLUQAyfKQ4g/mo/photo.jpg",
     },
   }*/

  let refreshToken = userInfo.refreshToken;
  let photoUrl = userInfo.user.photoUrl;
  // add user to collection
  let newIDRef = await db.collection('users').add({
    username,
    refreshToken,
    photoUrl,
    expoPushToken
  });

  return newIDRef.id;
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
      if(doc.data().groups) {
        doc.data().groups.forEach((groupId: string) => {
          groups.push(groupId);
        })
      }
      else {
        return groups;
      }
    }
    else {
      console.log("Can't find user");
    }
  });
  return groups;
}

/**
 * Returns relevant user information
 * @param userID unique user identification number represented in string form
 * @return a JSON object with the user's name, groups and profile photo
 */
export async function getUserInfo(userID: string) {
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);

  try {
    let doc = await db.collection('users').doc(userID).get();
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
 * Gets a new access token for a User using their refresh token (user must be in our database)
 * @param userID unique user identification number represented in string form
 * @return a new Access Token for the User
 */
export async function getNewToken(userID: string) {
  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);
  await db.collection('users').doc(userID).get().then((doc) => {
    if(doc.exists) {
      let refreshToken = doc.data().refreshToken;
      fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
      body:"client_id=9082209040-hlvr3h8uc9e8buaej5mphgv4lmvihpuf.apps.googleusercontent.com&client_secret=&refresh_token=" + refreshToken + "&grant_type=refresh_token"
      })
      .then(response => {
        return response.json();
      })
      .then (responseJSON => {
        console.log("Response...: ", responseJSON);
        console.log(responseJSON.access_token)
        return responseJSON.access_token;
      });
    }
    else {
      console.log("Can't find user to get refreshToken");
      return null;
    }
  });
}

// export default function deleteUser(userID: number) {

// }
