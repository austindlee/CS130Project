import {joinGroup } from '../utils/firebase/GroupsUtils';

import firebase from 'firebase';
import 'firebase/firestore';

beforeAll(() => {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAi3jiRJKl472HN-w-r4p8adyy1lnhV7Ss",
    authDomain: "planit-7df53.firebaseapp.com",
    databaseURL: "https://planit-7df53.firebaseio.com",
    projectId: "planit-7df53",
    storageBucket: "planit-7df53.appspot.com",
    messagingSenderId: "365219979561"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
});

test('Accessing group id of user of invalid user', () => {
  expect.assertions(1);
  return expect(joinGroup("invalidUserID", "invalidGroupID")).resolves.toBe(false);
});

test('Accessing group id of user of valid user', () => {
  expect.assertions(1);
  return expect(joinGroup("w27eVuOowrifG6szMWY3", "134392361")).resolves.toBe(true);
});

// This test is written to check if invalid user ids and invalid group ids return false
// and to see if once the user is added into the group, it is displayed properly in the database
// as the user has a groups field which lists the groups the user is a part of. The group object has
// a users field which lists the users in that group. The check with userInGroup and groupInUser is to
// check that the user is fully added to the group.
