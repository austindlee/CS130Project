import { Permissions, Notifications } from 'expo';
import firebase from 'firebase';
import randInt from '../FirebaseUtils';
import 'firebase/firestore';

const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

/**
 * Sends push notifications to a list of Expo IDs via HTTP
 * @param title Title of the push notification
 * @param body Body of the push notification
 * @param expoTokens Array containing a list of expo push notification tokens
 */
export async function sendPush(title: string, body: string, expoTokens: string[]) {
  return fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'accept-encoding': 'gzip, deflate'
    },
    body: JSON.stringify([{
      'to': expoTokens[0],
      'title': 'hello',
      'body': 'world',
      'channelId': 'PlanIt'
    }, {
      'to': expoTokens[1],
      'title': 'hello',
      'body': 'world',
      'channelId': 'PlanIt'
    }]),
  });
}
