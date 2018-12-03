import { createNewEvent } from '../utils/local/AddEventToCalendar';

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

test('Add new event', () => {
    return expect(
        createNewEvent(
            "bensonjaminhan@gmail.com", 
            "1/-uwHT1hYdu0U9LXaLNVgU80c0MkUWtbp2xOV2VnlTE2jlp-1b6fSXYAg5_kQprgb", 
            event['summary'], 
            event['end'], 
            event['start'], 
            event['attendees'])).toBe(true);
})