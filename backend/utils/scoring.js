const { normalizeSkill } = require('./skillMap');

function calculateDeterministicScore(extractedData, jobRequirements) {
  const normalizedReqs = jobRequirements.map(req => normalizeSkill(req)).filter(Boolean);
  const foundSkills = [
    ...(extractedData.skillsBySection?.experience || []),
    ...(extractedData.skillsBySection?.skillsList || []),
    ...(extractedData.skillsBySection?.generalSkills || [])
  ].map(s => normalizeSkill(s));

  let matchedCount = 0;
  const matchedList = [];
  normalizedReqs.forEach(req => {
    if (foundSkills.includes(req)) {
      matchedCount++;
      matchedList.push(req);
    }
  });

  const skillRatio = normalizedReqs.length > 0 ? matchedCount / normalizedReqs.length : 0;
  const skillScore = Math.round(skillRatio * 60);

  const months = extractedData.totalMonths || 0;
  let expScore = 0;
  if (months >= 60) expScore = 30;
  else if (months >= 36) expScore = 22;
  else if (months >= 12) expScore = 15;
  else if (months > 0) expScore = 5;

  const finalScore = Math.min(100, skillScore + expScore);

  return {
    matchScore: finalScore,
    score: finalScore,
    matchedSkills: [...new Set(matchedList)],
    missingRequiredSkills: jobRequirements.filter(r => !matchedList.includes(normalizeSkill(r))),
    professionalMonths: months,
    breakdown: { skillScore, expScore }
  };
}

module.exports = { calculateDeterministicScore };