// const moment = require("moment");

// function calculateExperienceMonths(text) {
//   if (!text || text.length < 5) return 0;

//   let total = 0;
//   const lines = text.split('\n');

//   for (const line of lines) {
//     // Find a dash that separates the start and end dates
//     const dashIndex = line.indexOf('-');
//     if (dashIndex === -1) continue;

//     const startPart = line.substring(0, dashIndex).trim();
//     const endPart = line.substring(dashIndex + 1).trim();

//     // Check if startPart looks like a month‑year (e.g., "Jan 2020")
//     if (!/^[A-Za-z]{3}\s+\d{4}$/.test(startPart)) continue;

//     const start = moment(startPart, "MMM YYYY");
//     if (!start.isValid()) continue;

//     let end;
//     if (/^(present|current)$/i.test(endPart)) {
//       end = moment();
//     } else if (/^[A-Za-z]{3}\s+\d{4}$/.test(endPart)) {
//       end = moment(endPart, "MMM YYYY");
//       if (!end.isValid()) continue;
//     } else {
//       continue;
//     }

//     const diff = end.diff(start, 'months');
//     if (diff > 0) total += diff;
//   }

//   return total;
// }

// module.exports = { calculateExperienceMonths };

const moment = require("moment");

function calculateExperienceMonths(text) {
  if (!text || text.length < 5) return 0;

  let total = 0;

  // Match patterns like:
  //   "Jan 2020 - Dec 2022"
  //   "Jan 2020 – Present"
  //   "January 2020 - December 2022"
  //   "01/2020 - 12/2022"
  // Using a single regex that captures start + end as one unit (no splitting on spaces)
  const rangePattern =
    /\b((?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{4}|\d{1,2}[\/]\d{4})\s*(?:–|—|-|to)\s*((?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{4}|\d{1,2}[\/]\d{4}|present|current)\b/gi;

  let match;
  while ((match = rangePattern.exec(text)) !== null) {
    const startStr = match[1].trim();
    const endStr   = match[2].trim();

    const formats = ["MMM YYYY", "MMMM YYYY", "MM/YYYY"];

    const start = moment(startStr, formats, true);
    // 'true' = strict mode — won't guess wrong formats

    // Fallback: non-strict for short month names
    const startFallback = start.isValid() ? start : moment(startStr, formats);

    let end;
    if (/^(present|current)$/i.test(endStr)) {
      end = moment();
    } else {
      end = moment(endStr, formats, true);
      if (!end.isValid()) end = moment(endStr, formats);
    }

    if (startFallback.isValid() && end.isValid()) {
      const diff = end.diff(startFallback, "months");
      if (diff > 0) total += diff;
    }
  }

  return total;
}

module.exports = { calculateExperienceMonths };