// Import from the actual module — do NOT redefine the function here
const { calculateExperienceMonths } = require("../utils/durationMath");

test('calculates months from a simple date range', () => {
  const text = 'Jan 2020 - Dec 2022';
  // Jan 2020 to Dec 2022 = 35 months
  expect(calculateExperienceMonths(text)).toBe(35);
});

test('handles "present" or "current"', () => {
  const text = 'Jun 2020 - Present';
  const months = calculateExperienceMonths(text);
  expect(months).toBeGreaterThan(0);
});

test('ignores non-experience date ranges (education)', () => {
  const text = `University of X, 2018-2022
Software Engineer, Jan 2020 - Dec 2022`;
  // "2018-2022" is year-only, no month — regex won't match it
  // Only "Jan 2020 - Dec 2022" matches = 35 months
  expect(calculateExperienceMonths(text)).toBe(35);
});

test('handles multiple job ranges', () => {
  const text = `Job1: Jan 2020 - Dec 2021
Job2: Mar 2022 - Sep 2023`;
  // Jan 2020 → Dec 2021 = 23 months
  // Mar 2022 → Sep 2023 = 18 months
  // Total = 41
  expect(calculateExperienceMonths(text)).toBe(41);
});