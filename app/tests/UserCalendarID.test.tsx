import firebase, { firestore } from 'firebase';
import 'firebase/firestore';
import * as Expo from 'expo';

const db = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);


test('the user has a calendarID in Firebase', () => {
	expect.assertions(1);
	return expect(await db.collection('users').doc(await Expo.SecureStore.getItemAsync('localUserID')).get().then((doc) => {
    if(doc.exists) {
        let calendarID = doc.data().userCalendarId;
        if (calendarID == undefined || calendarID == null){
          return null;
        }
        return true;
      }
    else {
        return null;
      }
  }).toBeCalledWith(expect.anything());
});
