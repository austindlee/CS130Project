const diff = require('../utils/GroupsUtils');
test('Accessing group id of user', () => {
  expect(joinGroup("invalidUserID", "invalidGroupID").toBe(false);
  expect(joinGroup("gEg9kFYpqUnjOmoPCA37", "0ufEvVnrMMOBD2gEq3RV").toBe(true));
  expect(userInGroup("gEg9kFYpqUnjOmoPCA37", "0ufEvVnrMMOBD2gEq3RV").toBe(true)); // To be implemented
  expect(groupInUser("0ufEvVnrMMOBD2gEq3RV", "gEg9kFYpqUnjOmoPCA37").toBe(true)); // To be implemented
});

// This test is written to check if invalid user ids and invalid group ids return false
// and to see if once the user is added into the group, it is displayed properly in the database
// as the user has a groups field which lists the groups the user is a part of. The group object has
// a users field which lists the users in that group. The check with userInGroup and groupInUser is to
// check that the user is fully added to the group.
