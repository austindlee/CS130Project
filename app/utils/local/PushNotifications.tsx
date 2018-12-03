import { Permissions, Notifications } from 'expo';
import firebase from 'firebase';
import randInt from '../FirebaseUtils';
import { getGroupInfo } from '../firebase/GroupsUtils';
import { getUserInfo } from '../firebase/UserUtils';
import 'firebase/firestore';

const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

/**
 * Sends push notifications to a list of Expo IDs via HTTP
 * @param title Title of the push notification
 * @param body Body of the push notification
 * @param expoTokens Array containing a list of expo push notification tokens
 */
export async function sendPush(title: string, body: string, groupId: string) {
  // get users
  let groupInfo = await getGroupInfo(groupId);
  console.log(groupInfo.users);
  // get each users expo token
  groupInfo.users.forEach((user) => {
    console.log(user);
    getUserInfo(user).then((userInfo) => {
      console.log(userInfo.expoPushToken);
      fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'accept-encoding': 'gzip, deflate'
        },
        body: JSON.stringify({
          'to': userInfo.expoPushToken,
          'title': 'PlanIt - Event added',
          'body': 'Check your Google calendar',
          'channelId': 'PlanIt'
        })
      })
    })
  })
}
