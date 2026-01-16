import express from 'express';
import { anxietyTypes, industries, identities } from '../data/mentors.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory storage for user profiles
const userProfiles = new Map();

// Get survey options
router.get('/options', (req, res) => {
  res.json({
    socialComfort: {
      meetingNewPeople: [
        { value: 'very_comfortable', label: 'Very comfortable' },
        { value: 'somewhat_comfortable', label: 'Somewhat comfortable' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'somewhat_anxious', label: 'Somewhat anxious' },
        { value: 'very_anxious', label: 'Very anxious' }
      ],
      conversationsExperienced: [
        { value: 'confident_curios', label: 'Confident and curious' },
        { value: 'slightly_intimidated', label: 'Slightly intimidated but engaged' },
        { value: 'quiet_unsure', label: 'Quiet and unsure what to ask' },
        { value: 'overwhelmed_nervous', label: 'Overwhelmed and nervous' }
      ],
      askingQuestions: [
        { value: 'very_comfortable', label: 'Very comfortable' },
        { value: 'somewhat_comfortable', label: 'Somewhat comfortable' },
        { value: 'only_encouraged', label: 'Only if encouraged' },
        { value: 'uncomfortable', label: 'Uncomfortable' }
      ],
      networkingStatement: [
        { value: 'enjoy_networking', label: 'I enjoy networking and meeting new people' },
        { value: 'okay_effort', label: 'I\'m okay with it but it takes effort' },
        { value: 'avoid_possible', label: 'I avoid it when possible' },
        { value: 'want_anxious', label: 'I want to network but feel anxious doing so' }
      ]
    },
    identities: [
      { value: 'student', label: 'Student' },
      { value: 'early_career', label: 'Early-career professional' },
      { value: 'mid_career', label: 'Mid-career professional' },
      { value: 'career_changer', label: 'Career changer' },
      { value: 'founder', label: 'Founder / entrepreneur' },
      { value: 'woman_female', label: 'Woman / female-identifying' },
      { value: 'man_male', label: 'Man / male-identifying' },
      { value: 'non_binary', label: 'Non-binary / gender diverse' },
      { value: 'international', label: 'International background' },
      { value: 'immigrant', label: 'Immigrant' },
      { value: 'refugee', label: 'Refugee or displaced background' },
      { value: 'first_gen', label: 'First-generation (in education or career)' },
      { value: 'underrepresented', label: 'Underrepresented background in my field' },
      { value: 'returning_work', label: 'Returning to work after a break' },
      { value: 'caregiver', label: 'Caregiver responsibilities' },
      { value: 'self_describe', label: 'Prefer to self-describe', allowText: true },
      { value: 'prefer_not', label: 'Prefer not to say' }
    ],
    currentChallenges: [
      { value: 'lack_clarity', label: 'Lack of clarity about my career direction' },
      { value: 'feeling_behind', label: 'Feeling behind compared to peers' },
      { value: 'imposter_syndrome', label: 'Imposter syndrome' },
      { value: 'burnout', label: 'Burnout or lack of motivation' },
      { value: 'education_cert', label: 'Navigating education or certifications' },
      { value: 'transitioning_careers', label: 'Transitioning careers or industries' },
      { value: 'workplace_confidence', label: 'Workplace confidence or communication' },
      { value: 'building_network', label: 'Building a professional network' },
      { value: 'balancing_life', label: 'Balancing personal life and career' }
    ],
    mentorshipAreas: [
      { value: 'career_direction', label: 'Career direction' },
      { value: 'skill_development', label: 'Skill development' },
      { value: 'education_planning', label: 'Education planning' },
      { value: 'confidence_communication', label: 'Confidence and communication' },
      { value: 'networking', label: 'Networking' },
      { value: 'leadership', label: 'Leadership or advancement' },
      { value: 'personal_growth', label: 'Personal growth alongside career' }
    ],
    directions: [
      { value: 'adventurer', label: '🌍 Adventurer', description: 'I\'m exploring options, interests, or possibilities.' },
      { value: 'architect', label: '🧭 Architect', description: 'I have a specific career or goal I\'m working toward.' }
    ],
    interests: [
      { value: 'technology', label: 'Technology' },
      { value: 'business_entrepreneurship', label: 'Business / Entrepreneurship' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'arts_creative', label: 'Arts / Creative fields' },
      { value: 'education', label: 'Education' },
      { value: 'social_impact', label: 'Social impact / Nonprofit' },
      { value: 'science_research', label: 'Science / Research' },
      { value: 'trades_labor', label: 'Trades / Skilled labor' },
      { value: 'other', label: 'Other', allowText: true }
    ],
    excitements: [
      { value: 'solving_problems', label: 'Solving problems' },
      { value: 'helping_people', label: 'Helping people' },
      { value: 'creativity', label: 'Creativity' },
      { value: 'stability', label: 'Stability' },
      { value: 'income_potential', label: 'Income potential' }
    ]
  });
});

// Submit survey and create user profile
router.post('/submit', (req, res) => {
  const {
    socialComfort,
    identities,
    currentChallengesText,
    currentChallenges,
    mentorshipArea,
    direction,
    interests,
    excitements,
    name,
    school
  } = req.body;

  const userId = uuidv4();
  const profile = {
    id: userId,
    name: name || "Student",
    school: school || "University",
    socialComfort: socialComfort || {},
    identities: identities || [],
    currentChallengesText: currentChallengesText || "",
    currentChallenges: currentChallenges || [],
    mentorshipArea: mentorshipArea || "",
    direction: direction || "",
    interests: interests || [],
    excitements: excitements || [],
    confidenceScore: 30, // Starting confidence
    outreachCount: 0,
    chatCount: 0,
    createdAt: new Date().toISOString()
  };

  userProfiles.set(userId, profile);

  // Generate personalized insight based on responses
  let insight = "We'll help you find mentors who match your goals and comfort level.";
  let tips = ["Take it one step at a time", "Everyone starts somewhere"];

  if (socialComfort?.meetingNewPeople === 'very_anxious' || socialComfort?.meetingNewPeople === 'somewhat_anxious') {
    insight = "We understand networking can feel daunting. We'll connect you with mentors who are patient and understanding.";
    tips = [
      "Start with mentors who have been in your shoes",
      "Remember: most professionals love helping students",
      "Your feelings are completely valid"
    ];
  } else if (direction === 'adventurer') {
    insight = "Exploring is exciting! We'll help you discover what lights you up.";
    tips = [
      "Mentors can help you navigate your interests",
      "It's okay not to have everything figured out",
      "Every career journey starts with curiosity"
    ];
  }

  res.json({
    userId,
    profile,
    insight,
    tips
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
