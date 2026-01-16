import express from 'express';
import { anxietyTypes, industries, identities } from '../data/mentors.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage for user profiles
const userProfiles = new Map();

// Get survey options
router.get('/options', (req, res) => {
  res.json({
    anxietyTypes,
    industries,
    identities,
    goals: [
      { id: "career", label: "Career advice", description: "Learn about different career paths" },
      { id: "industry", label: "Industry insights", description: "Understand what it's like to work in a field" },
      { id: "skills", label: "Skill development", description: "Learn what skills to develop" },
      { id: "network", label: "Build network", description: "Expand my professional connections" },
      { id: "confidence", label: "Build confidence", description: "Get more comfortable with networking" }
    ],
    personalityStyles: [
      { id: "direct", label: "Direct & to the point", description: "I prefer concise, efficient communication" },
      { id: "warm", label: "Warm & personable", description: "I like building rapport and connection" },
      { id: "curious", label: "Curious & inquisitive", description: "I love asking lots of questions" },
      { id: "thoughtful", label: "Thoughtful & prepared", description: "I prefer to research and prepare thoroughly" }
    ]
  });
});

// Submit survey and create user profile
router.post('/submit', (req, res) => {
  const { anxieties, industries, identities, goals, personalityStyle, name, school } = req.body;

  const userId = uuidv4();
  const profile = {
    id: userId,
    name: name || "Student",
    school: school || "University",
    anxieties: anxieties || [],
    industries: industries || [],
    identities: identities || [],
    goals: goals || [],
    personalityStyle: personalityStyle || "warm",
    confidenceScore: 30, // Starting confidence
    outreachCount: 0,
    chatCount: 0,
    createdAt: new Date().toISOString()
  };

  userProfiles.set(userId, profile);

  // Generate personalized insight
  const primaryAnxiety = anxietyTypes.find(a => a.id === anxieties?.[0]);
  const insight = primaryAnxiety
    ? `We understand you're nervous about ${primaryAnxiety.label.toLowerCase()}. We'll help you structure your outreach to feel more confident.`
    : "We'll help you build confidence in reaching out to professionals.";

  res.json({
    userId,
    profile,
    insight,
    tips: primaryAnxiety?.tips || ["Take it one step at a time", "Everyone starts somewhere"]
  });
});

// Get user profile
router.get('/profile/:userId', (req, res) => {
  const profile = userProfiles.get(req.params.userId);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(profile);
});

// Update user profile
router.patch('/profile/:userId', (req, res) => {
  const profile = userProfiles.get(req.params.userId);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const updatedProfile = { ...profile, ...req.body };
  userProfiles.set(req.params.userId, updatedProfile);
  res.json(updatedProfile);
});

export default router;
