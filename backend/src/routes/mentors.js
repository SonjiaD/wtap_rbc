import express from 'express';
import { mentors } from '../data/mentors.js';

const router = express.Router();

// Get all mentors
router.get('/', (req, res) => {
  res.json(mentors);
});

// Get matched mentors based on user preferences
router.post('/match', (req, res) => {
  const { industries, identities, school } = req.body;

  // Score each mentor based on matching criteria
  const scoredMentors = mentors.map(mentor => {
    let score = 0;
    const matchReasons = [];

    // Check industry match
    const industryMatch = mentor.industries.some(i =>
      industries?.some(ui => ui.toLowerCase() === i.toLowerCase())
    );
    if (industryMatch) {
      score += 3;
      const matchedIndustry = mentor.industries.find(i =>
        industries?.some(ui => ui.toLowerCase() === i.toLowerCase())
      );
      matchReasons.push(`Works in ${matchedIndustry}`);
    }

    // Check identity/tag match
    mentor.tags.forEach(tag => {
      if (identities?.some(id =>
        tag.toLowerCase().includes(id.toLowerCase()) ||
        id.toLowerCase().includes(tag.toLowerCase())
      )) {
        score += 2;
        matchReasons.push(`Shares your ${tag} background`);
      }
    });

    // Check school match
    if (school && mentor.school.toLowerCase().includes(school.toLowerCase())) {
      score += 2;
      matchReasons.push(`Alumni from ${mentor.school}`);
    }

    // Bonus for mentors who actively help students
    if (mentor.reachOutHistory.includes("mentor") || mentor.reachOutHistory.includes("student")) {
      score += 1;
      matchReasons.push("Actively mentors students");
    }

    return {
      ...mentor,
      matchScore: score,
      matchReasons: matchReasons.length > 0 ? matchReasons : ["Great mentor for your journey"]
    };
  });

  // Sort by score and return top matches
  const topMatches = scoredMentors
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);

  res.json({
    matches: topMatches,
    message: "We found people who understand your journey"
  });
});

// Get single mentor
router.get('/:id', (req, res) => {
  const mentor = mentors.find(m => m.id === parseInt(req.params.id));
  if (!mentor) {
    return res.status(404).json({ error: 'Mentor not found' });
  }
  res.json(mentor);
});

export default router;
