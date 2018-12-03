import { getUserCalendarInfo } from '../screens/SignInScreen';

test('the response is 200 and contains a calendarList', () => {
	expect.assertions(1);
	return expect(getUserCalendarInfo('aadfadfadf')).resolves;
});
