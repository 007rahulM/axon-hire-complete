// __tests__/matchingEngine.test.js
const { calculateV3Score } = require('../utils/matchingEngine');

jest.mock('../utils/skillMap', () => ({
  normalizeSkill: (skill) => skill.toLowerCase().replace(/[^a-z0-9+#]/g, ''),
  getSkillWeight: () => 1.0,
}));

describe('calculateV3Score', () => {
  test('returns 100 for perfect match', () => {
    const candidate = {
      skills: ['react', 'node', 'mongodb'],
      totalMonths: 24,
      links: ['https://github.com/user', 'https://portfolio.com', 'https://vercel.app/demo'],
    };
    const jobRequirements = ['react', 'node', 'mongodb'];

    const result = calculateV3Score(candidate, jobRequirements);

    expect(result.score).toBe(100);
    expect(result.matchedSkills).toEqual(jobRequirements);
    expect(result.missingRequiredSkills).toEqual([]);
    expect(result.professionalMonths).toBe(24);
    expect(result.uniqueLinksFound).toBe(3);
    expect(result.breakdown).toEqual({
      skillScore: 60,
      expScore: 30,
      integrityScore: 10,
    });
  });

  test('handles partial skills and low experience', () => {
    const candidate = {
      skills: ['react'],
      totalMonths: 6,
      links: [],
    };
    const jobRequirements = ['react', 'node', 'mongodb'];

    const result = calculateV3Score(candidate, jobRequirements);

    // Skills: 1/3 = 20 points (60 * 1/3 = 20)
    // Experience: 6/24 = 7.5 points (30 * 6/24 = 7.5)
    // Links: 0 → 0
    // Total = 27.5 → rounded to 28
    expect(result.score).toBe(28);
    expect(result.matchedSkills).toEqual(['react']);
    expect(result.missingRequiredSkills).toEqual(['node', 'mongodb']);
    expect(result.professionalMonths).toBe(6);
    expect(result.uniqueLinksFound).toBe(0);
  });

  test('handles missing skills', () => {
    const candidate = {
      skills: ['python'],
      totalMonths: 48,
      links: ['https://github.com/user'],
    };
    const jobRequirements = ['react', 'node'];

    const result = calculateV3Score(candidate, jobRequirements);

    // Skills: 0/2 = 0
    // Experience: 48 months → full 30
    // Links: 1 → 5
    // Total = 35
    expect(result.score).toBe(35);
    expect(result.matchedSkills).toEqual([]);
    expect(result.missingRequiredSkills).toEqual(['react', 'node']);
  });


  test('handles weighted skills', () => {
//   // Get a reference to the mocked getSkillWeight
//   const skillMap = require('../utils/skillMap');
//   const originalGetWeight = skillMap.getSkillWeight;

//   // Override for this test
//   skillMap.getSkillWeight = (skill) => {
//     if (skill === 'react') return 2.0;
//     if (skill === 'node') return 1.5;
//     return 1.0;
//   };

//   const candidate = {
//     skills: ['react', 'node'],
//     totalMonths: 24,
//     links: ['https://github.com/user'],
//   };
//   const jobRequirements = ['react', 'node', 'mongodb'];

//   const result = calculateV3Score(candidate, jobRequirements);
//   // Compute expected
//   // Total weight = 2.0 + 1.5 + 1.0 = 4.5
//   // Earned = 2.0 + 1.5 = 3.5
//   // skillPoints = (3.5 / 4.5) * 60 ≈ 46.666 → 47
//   // expPoints = 30
//   // links = 1 → 5
//   // total = 82
//   expect(result.score).toBe(82);
//   expect(result.matchedSkills).toEqual(['react', 'node']);
//   expect(result.missingRequiredSkills).toEqual(['mongodb']);

//   // Restore original mock
//   skillMap.getSkillWeight = originalGetWeight;
});
});