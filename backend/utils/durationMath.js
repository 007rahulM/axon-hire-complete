// backend/utils/durationMath.js
const moment = require("moment");

const calculateExperienceMonths = (text) => {
  // 🚀 FIX: If the text is empty (no experience zone found), return 0 immediately.
  // This prevents scanning the whole resume (and education dates) by accident.
  if (!text || text.length < 5) return 0; 

  const dateRangeRegex = /(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{1,2}[\/\-]\d{2,4})\s*[\-\–\—\sto]+\s*(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{1,2}[\/\-]\d{2,4}|present|current)/gi;

  const matches = text.match(dateRangeRegex);
  if (!matches) return 0;

  let totalMonths = 0;
  matches.forEach(range => {
    const parts = range.split(/[\-\–\—\sto]+/).map(p => p.trim());
    if (parts.length < 2) return;

    const start = moment(parts[0], ["MMM YYYY", "MM/YYYY", "YYYY", "MMM-YYYY"]);
    let end = /present|current/i.test(parts[1]) ? moment() : moment(parts[1], ["MMM YYYY", "MM/YYYY", "YYYY", "MMM-YYYY"]);

    if (start.isValid() && end.isValid()) {
      const diff = end.diff(start, 'months');
      if (diff > 0) totalMonths += diff;
    }
  });

  return totalMonths;
}

module.exports = { calculateExperienceMonths };