import { getUserInfo } from '../screens/SignInScreen';
import { signInWithGoogleAsync }  from '../screens/SignInScreen';

test('the response is 200 and contains a calendarList', () => {
	expect.assertions(2);
	return getUserInfo(signInWithGoogleAsync()).then(calendarResponse => {
		expect(calendarResponse._bodyInit.kind).toBe('calendar#calendarList');
	  expect(calendarResponse.status).toBe(200);
	});
});
