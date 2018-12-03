import firebase from 'firebase';
import 'firebase/firestore';
import * as Expo from 'expo';

/**
 * Adds an event to a Google Calendar
 * @param calendarID Key for Google Calendar
 * @param accessToken Authentification token for Google account
 * @param summary Title of the event
 * @param end End time of the event
 * @param start Start time of the event
 * @param attendees List of the people in the group for the event
 */
export async function createEvent(calendarID, accessToken, summary, end, start, attendees) {
    let requestBody = {
        "summary": summary,
        "end": end,
        "start": start,
        "attendees": attendees,
    };
    let requestBodyJSON = JSON.stringify(requestBody)
    console.log("hello");
    await fetch('https://www.googleapis.com/calendar/v3/calendars/' + calendarID + '/events', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: requestBodyJSON
    })
};

export async function addTestEventToCalendar() {
    var event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2018-12-02T20:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'dateTime': '2018-12-02T21:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
            {'email': 'mildollarbaby@gmail.com'},
            {'email': 'bensonhan@g.ucla.edu'},
            {'email': 'bensonjaminhan@gmail.com'}
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
            ]
        }
    };

    const result = await Expo.Google.logInAsync({
        androidClientId: "9082209040-2um3lmf7kfh1enpabk5o6igiump72ppi.apps.googleusercontent.com",
        iosClientId: "9082209040-hlvr3h8uc9e8buaej5mphgv4lmvihpuf.apps.googleusercontent.com",
        behavior: "web",
        scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    });

    if (result.type == 'success') {
        console.log(result.accessToken);
        createEvent("bensonjaminhan@gmail.com", result.accessToken, event['summary'], event['end'], event['start'], event['attendees']);
    }
};
