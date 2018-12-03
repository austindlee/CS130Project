import { Permissions, Notifications } from 'expo';
import firebase from 'firebase';
import randInt from '../FirebaseUtils';
import 'firebase/firestore';

const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

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
