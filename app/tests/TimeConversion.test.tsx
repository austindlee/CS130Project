import { dateDiffInDays } from '../utils/local/TimeConversion';

test('difference between the same date', () => {
  expect(dateDiffInDays(new Date(), new Date())).toBe(0);
})
