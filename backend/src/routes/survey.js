import express from 'express';
import { anxietyTypes, industries, identities } from '../data/mentors.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage for user profiles
const userProfiles = new Map();

// Get survey options
router.get('/options', (req, res) => {
  res.json({
    challenges: anxietyTypes,
    industries,
    identities,
    goals: [
      { id: 'experiences', label: "Getting to know other people's experiences", description: 'Learn from their journey' },
      { id: 'career', label: 'Getting career advice', description: 'Understand different paths' },
      { id: 'industry', label: 'Learning about an industry', description: "What's it really like?" },
      { id: 'skills', label: 'Figuring out what skills to develop', description: 'What should I learn?' },
      { id: 'network', label: 'Building my professional network', description: 'Make real connections' },
      { id: 'confidence', label: 'Building confidence in networking', description: 'Get more comfortable' }
    ],
    yearLevels: [
      { id: 'year1', label: '1st Year', description: 'Just starting out' },
      { id: 'year2', label: '2nd Year', description: 'Finding my path' },
      { id: 'year3', label: '3rd Year', description: 'Getting serious' },
      { id: 'year4', label: '4th Year+', description: 'Almost there' },
      { id: 'grad', label: 'Graduate Student', description: 'Advanced studies' },
      { id: 'recent', label: 'Recent Graduate', description: 'Just finished' }
    ],
    personalityStyles: [
      { id: 'direct', label: 'Direct & to the point', description: 'Keep it short and sweet' },
      { id: 'warm', label: 'Warm & personable', description: 'I like building rapport' },
      { id: 'curious', label: 'Curious & inquisitive', description: 'Lots of questions!' },
      { id: 'thoughtful', label: 'Thoughtful & prepared', description: 'I research beforehand' }
    ]
  });
});

// Submit survey and create user profile
router.post('/submit', (req, res) => {
  const { challenges, industries, identities, goals, personalityStyle, name, school, yearLevel, whereYouWantToBe, mentorLevels } = req.body;

  const userId = uuidv4();
  const profile = {
    id: userId,
    name: name || "Student",
    school: school || "University",
    yearLevel: yearLevel || "",
    whereYouWantToBe: whereYouWantToBe || "",
    mentorLevels: mentorLevels || 1,
    challenges: challenges || [],
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
  const primaryChallenge = challenges?.[0];
  const challengeData = anxietyTypes.find(a => a.id === primaryChallenge);
  const insight = challengeData
    ? `We understand you're nervous about ${challengeData.label.toLowerCase()}. We'll help you structure your outreach to feel more confident.`
    : "We'll help you build confidence in reaching out to professionals.";

  res.json({
    userId,
    profile,
    insight,
    tips: challengeData?.tips || ["Take it one step at a time", "Everyone starts somewhere"]
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
