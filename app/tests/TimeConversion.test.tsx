const diff = require('../utils/TimeConversion');

test('difference between the same date', () => {
  expect(diff(new Date(), new Date())).toBe(0);
})
