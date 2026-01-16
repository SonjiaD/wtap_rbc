import express from 'express';

const router = express.Router();

// In-memory storage for reflections
const reflections = new Map();
const userProgress = new Map();

// Submit a reflection after a coffee chat
router.post('/submit', (req, res) => {
  const {
    userId,
    mentorId,
    mentorName,
    chatDate,
    overallRating,
    anxietyBefore,
    anxietyAfter,
    whatWentWell,
    whatToImprove,
    keyTakeaways,
    wouldReachOutAgain,
    followUpPlanned
  } = req.body;

  const reflectionId = `${userId}-${mentorId}-${Date.now()}`;
  const reflection = {
    id: reflectionId,
    userId,
    mentorId,
    mentorName,
    chatDate: chatDate || new Date().toISOString(),
    overallRating,
    anxietyBefore,
    anxietyAfter,
    anxietyReduction: anxietyBefore - anxietyAfter,
    whatWentWell,
    whatToImprove,
    keyTakeaways,
    wouldReachOutAgain,
    followUpPlanned,
    createdAt: new Date().toISOString()
  };

  // Store reflection
  reflections.set(reflectionId, reflection);

  // Update user progress
  const progress = userProgress.get(userId) || {
    totalChats: 0,
    totalOutreach: 0,
    averageAnxietyReduction: 0,
    confidenceScore: 30,
    reflections: [],
    streak: 0,
    lastActivityDate: null
  };

  progress.totalChats += 1;
  progress.reflections.push(reflectionId);

  // Calculate new average anxiety reduction
  const allUserReflections = progress.reflections
    .map(id => reflections.get(id))
    .filter(Boolean);

  const totalReduction = allUserReflections.reduce(
    (sum, r) => sum + (r.anxietyReduction || 0), 0
  );
  progress.averageAnxietyReduction = totalReduction / allUserReflections.length;

  // Update confidence score (increases with positive experiences)
  const confidenceBoost = calculateConfidenceBoost(reflection);
  progress.confidenceScore = Math.min(100, progress.confidenceScore + confidenceBoost);

  // Update streak
  const today = new Date().toDateString();
  const lastActivity = progress.lastActivityDate ? new Date(progress.lastActivityDate).toDateString() : null;
  if (lastActivity === today) {
    // Same day, no streak change
  } else if (lastActivity === new Date(Date.now() - 86400000).toDateString()) {
    // Yesterday, increment streak
    progress.streak += 1;
  } else {
    // Streak broken or first activity
    progress.streak = 1;
  }
  progress.lastActivityDate = new Date().toISOString();

  userProgress.set(userId, progress);

  // Generate feedback and encouragement
  const feedback = generateFeedback(reflection, progress);

  res.json({
    reflection,
    progress,
    feedback
  });
});

// Get user progress
router.get('/progress/:userId', (req, res) => {
  const progress = userProgress.get(req.params.userId) || {
    totalChats: 0,
    totalOutreach: 0,
    averageAnxietyReduction: 0,
    confidenceScore: 30,
    reflections: [],
    streak: 0,
    lastActivityDate: null
  };

  // Get reflection details
  const reflectionDetails = progress.reflections
    .map(id => reflections.get(id))
    .filter(Boolean)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({
    ...progress,
    reflectionDetails,
    nextMilestone: getNextMilestone(progress),
    encouragement: getEncouragement(progress)
  });
});

// Log outreach sent
router.post('/outreach', (req, res) => {
  const { userId, mentorId, mentorName } = req.body;

  const progress = userProgress.get(userId) || {
    totalChats: 0,
    totalOutreach: 0,
    averageAnxietyReduction: 0,
    confidenceScore: 30,
    reflections: [],
    streak: 0,
    lastActivityDate: null
  };

  progress.totalOutreach += 1;
  progress.confidenceScore = Math.min(100, progress.confidenceScore + 3);
  progress.lastActivityDate = new Date().toISOString();

  userProgress.set(userId, progress);

  res.json({
    progress,
    message: `Great job reaching out to ${mentorName || 'a mentor'}! That takes courage.`,
    tip: "Remember: No response usually means they're busy, not rejecting you."
  });
});

// Get all reflections for a user
router.get('/history/:userId', (req, res) => {
  const progress = userProgress.get(req.params.userId);
  if (!progress) {
    return res.json({ reflections: [], summary: null });
  }

  const userReflections = progress.reflections
    .map(id => reflections.get(id))
    .filter(Boolean)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const summary = {
    totalChats: userReflections.length,
    averageRating: userReflections.reduce((sum, r) => sum + (r.overallRating || 0), 0) / userReflections.length || 0,
    averageAnxietyReduction: progress.averageAnxietyReduction,
    topTakeaways: userReflections
      .flatMap(r => r.keyTakeaways || [])
      .slice(0, 5),
    growthAreas: userReflections
      .flatMap(r => r.whatToImprove || [])
      .slice(0, 3)
  };

  res.json({ reflections: userReflections, summary });
});

// Helper functions
function calculateConfidenceBoost(reflection) {
  let boost = 5; // Base boost for completing a chat

  if (reflection.overallRating >= 4) boost += 3;
  if (reflection.anxietyReduction > 2) boost += 3;
  if (reflection.wouldReachOutAgain) boost += 2;
  if (reflection.whatWentWell?.length >= 2) boost += 2;

  return boost;
}

function generateFeedback(reflection, progress) {
  const messages = [];

  // Anxiety reduction feedback
  if (reflection.anxietyReduction > 0) {
    messages.push(`Your anxiety decreased by ${reflection.anxietyReduction} points during this chat. That's growth! 🌱`);
  }

  // Progress feedback
  if (progress.totalChats === 1) {
    messages.push("You completed your first coffee chat! The hardest part is starting.");
  } else if (progress.totalChats === 5) {
    messages.push("5 coffee chats completed! You're building a real network.");
  } else if (progress.totalChats === 10) {
    messages.push("10 conversations! You're becoming a networking pro.");
  }

  // Confidence feedback
  if (progress.confidenceScore >= 50 && progress.confidenceScore < 55) {
    messages.push("You've crossed the 50% confidence threshold! Keep going.");
  } else if (progress.confidenceScore >= 75) {
    messages.push("Your confidence is soaring! Consider paying it forward by mentoring others.");
  }

  // Streak feedback
  if (progress.streak >= 3) {
    messages.push(`${progress.streak}-day streak! Consistency is key to building confidence.`);
  }

  return {
    messages,
    nextAction: reflection.followUpPlanned
      ? "Don't forget to send that follow-up thank you!"
      : "Consider sending a brief thank you note within 24 hours."
  };
}

function getNextMilestone(progress) {
  if (progress.totalChats < 1) return { target: 1, label: "Complete your first coffee chat" };
  if (progress.totalChats < 5) return { target: 5, label: "Have 5 conversations" };
  if (progress.totalChats < 10) return { target: 10, label: "Reach 10 coffee chats" };
  if (progress.confidenceScore < 75) return { target: 75, label: "Reach 75% confidence" };
  return { target: null, label: "Help others on their journey" };
}

function getEncouragement(progress) {
  const encouragements = [
    "Every expert was once a beginner.",
    "The person you're nervous to message was once in your shoes.",
    "Rejection is redirection.",
    "Building relationships is a skill - and you're practicing.",
    "Your unique perspective is valuable."
  ];

  if (progress.totalChats === 0) {
    return "You've taken the first step by being here. Now let's find someone to connect with.";
  }

  return encouragements[progress.totalChats % encouragements.length];
}

export default router;
