// backend/tests/unit/skillMap.test.js
jest.mock('../models/Skill'); // must be FIRST, before any imports

const { normalizeSkill, extractSkillsFromText, refreshSkillCache } = require('../utils/skillMap');
const Skill = require('../models/Skill');

beforeEach(async () => {
  Skill.find.mockResolvedValue([
    { canonical: 'react', synonyms: ['react.js', 'reactjs'], weight: 1.0, isApproved: true },
    { canonical: 'node', synonyms: ['node.js', 'nodejs'], weight: 1.2, isApproved: true },
    { canonical: 'javascript', synonyms: ['js', 'ecmascript'], weight: 1.0, isApproved: true },
    { canonical: 'mongodb', synonyms: ['mongo', 'mongoose'], weight: 1.1, isApproved: true },
  ]);
  await refreshSkillCache();
});

test('normalizeSkill maps synonyms to canonical', () => {
  expect(normalizeSkill('react.js')).toBe('react');
  expect(normalizeSkill('React')).toBe('react');
  expect(normalizeSkill('nodejs')).toBe('node');
  expect(normalizeSkill('JavaScript')).toBe('javascript');
  expect(normalizeSkill('mongodb')).toBe('mongodb');
  expect(normalizeSkill('unknownskill')).toBe('unknownskill');
});

test('extractSkillsFromText finds skills in text', () => {
  const text = 'I have experience with React and Node.js, also know JavaScript and mongo.';
  const skills = extractSkillsFromText(text);
  expect(skills).toContain('react');
  expect(skills).toContain('node');
  expect(skills).toContain('javascript');
  expect(skills).toContain('mongodb');
});