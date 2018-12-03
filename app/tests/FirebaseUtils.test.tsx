import {getUsersGroups} from '../utils/firebase/UserUtils';

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

test('Accessing group id of user', () => {
  expect.assertions(1);
  return expect(getUsersGroups("0")).resolves.toBe(['']);
});
