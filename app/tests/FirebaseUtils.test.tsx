import {getUsersGroups} from '../utils/firebase/UserUtils';

test('Accessing group id of user', () => {
  return expect(getUsersGroups("0")).resolves.toBe(['']);
});
