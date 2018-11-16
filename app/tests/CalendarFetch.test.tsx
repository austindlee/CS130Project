const getUserInfo = require('../screens/SignInScreen');
const signInWithGoogleAsync = require('../screens/SignInScreen');

test('the response is 200 and contains a calendarList', () => {
	expect.assertions(2);
	return getUserInfo(signInWithGoogleAsync()).then(calendarResponse => {
		expect(calendarResponse._bodyInit.kind).toBe('calendar#calendarList');
	    expect(calendarResponse.status).toBe(200);
	});
});