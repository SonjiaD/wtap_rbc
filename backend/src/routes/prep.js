import express from 'express';

const router = express.Router();

// Question templates by category
const questionTemplates = {
  journey: [
    "What was your path from {school} to your current role at {company}?",
    "What surprised you most about transitioning from university to the working world?",
    "Were there any pivotal moments or decisions that shaped your career?",
    "What did you wish you knew when you were in my position?"
  ],
  dayToDay: [
    "What does a typical day or week look like in your role?",
    "What's the most rewarding part of your job?",
    "What challenges do you face most often?",
    "How has your role evolved since you started?"
  ],
  skills: [
    "What skills have been most valuable in your career?",
    "Is there anything you wish you had learned earlier?",
    "How do you stay current in your field?",
    "What should I be focusing on while I'm still in school?"
  ],
  industry: [
    "What trends are you seeing in {industry}?",
    "What advice would you give someone trying to break into this field?",
    "What misconceptions do people have about working in {industry}?",
    "Where do you see the industry heading in the next few years?"
  ],
  personal: [
    "How do you maintain work-life balance?",
    "What's something about your job that people might not expect?",
    "What keeps you motivated in your work?",
    "Is there anything you would have done differently in your career?"
  ]
};

// Talking points templates
const talkingPointTemplates = {
  introduction: [
    "I'm a {year} student at {school} studying {program}",
    "I became interested in {industry} because...",
    "My goal is to... (keep it concise and authentic)"
  ],
  connection: [
    "I noticed we both {connection_point}",
    "Your journey resonated with me because...",
    "I was particularly inspired by {specific_thing}"
  ],
  closing: [
    "Is there anyone else you'd recommend I speak with?",
    "What's the best way to stay in touch?",
    "Thank you so much for your time - this was incredibly helpful"
  ]
};

// Agenda templates
const agendaTemplates = {
  short: {
    duration: "15 minutes",
    structure: [
      { time: "0-2 min", activity: "Quick introduction" },
      { time: "2-10 min", activity: "2-3 focused questions" },
      { time: "10-14 min", activity: "Follow-up discussion" },
      { time: "14-15 min", activity: "Thank you and next steps" }
    ]
  },
  standard: {
    duration: "30 minutes",
    structure: [
      { time: "0-5 min", activity: "Introductions and rapport building" },
      { time: "5-15 min", activity: "Their journey and experience" },
      { time: "15-25 min", activity: "Your questions and advice" },
      { time: "25-30 min", activity: "Closing and follow-up" }
    ]
  }
};

// Generate prep materials
router.post('/generate', (req, res) => {
  const { user, mentor } = req.body;

  // Personalize questions
  const personalizedQuestions = {};
  Object.entries(questionTemplates).forEach(([category, questions]) => {
    personalizedQuestions[category] = questions.map(q =>
      q.replace('{school}', mentor.school)
        .replace('{company}', mentor.company)
        .replace('{industry}', mentor.industries?.[0] || 'your field')
    );
  });

  // Personalize talking points
  const personalizedTalkingPoints = {
    introduction: talkingPointTemplates.introduction.map(t =>
      t.replace('{year}', 'current')
        .replace('{school}', user.school || 'my university')
        .replace('{program}', user.program || 'my program')
        .replace('{industry}', user.industries?.[0] || 'this field')
    ),
    connection: talkingPointTemplates.connection.map(t =>
      t.replace('{connection_point}', mentor.matchReasons?.[0]?.toLowerCase() || 'share similar interests')
        .replace('{specific_thing}', mentor.background || 'your journey')
    ),
    closing: talkingPointTemplates.closing
  };

  // Build recommended questions based on user goals
  const recommendedQuestions = [];
  if (user.goals?.includes('career')) {
    recommendedQuestions.push(...personalizedQuestions.journey.slice(0, 2));
  }
  if (user.goals?.includes('industry')) {
    recommendedQuestions.push(...personalizedQuestions.industry.slice(0, 2));
  }
  if (user.goals?.includes('skills')) {
    recommendedQuestions.push(...personalizedQuestions.skills.slice(0, 2));
  }
  // Always include at least one question from each main category
  if (recommendedQuestions.length < 5) {
    recommendedQuestions.push(personalizedQuestions.journey[0]);
    recommendedQuestions.push(personalizedQuestions.dayToDay[0]);
    recommendedQuestions.push(personalizedQuestions.skills[0]);
  }

  // Limit to top 5 unique questions
  const uniqueQuestions = [...new Set(recommendedQuestions)].slice(0, 5);

  res.json({
    mentor: {
      name: mentor.name,
      role: mentor.role,
      company: mentor.company,
      background: mentor.background,
      bio: mentor.bio
    },
    agenda: agendaTemplates.short,
    recommendedQuestions: uniqueQuestions,
    allQuestions: personalizedQuestions,
    talkingPoints: personalizedTalkingPoints,
    tips: [
      "Research their recent work or company news beforehand",
      "Have your questions written down but stay flexible",
      "Take brief notes during the conversation",
      "Send a thank you message within 24 hours",
      "It's okay to be nervous - they expect it!"
    ],
    dos: [
      "Be punctual - join 1-2 minutes early",
      "Have a quiet, professional background",
      "Show genuine curiosity and listen actively",
      "Be specific in your questions",
      "Express gratitude for their time"
    ],
    donts: [
      "Don't ask for a job directly",
      "Don't dominate the conversation",
      "Don't go over the scheduled time",
      "Don't be discouraged if they're busy",
      "Don't forget to follow up"
    ]
  });
});

// Get just the agenda
router.get('/agenda/:type', (req, res) => {
  const agenda = agendaTemplates[req.params.type];
  if (!agenda) {
    return res.status(404).json({ error: 'Agenda type not found' });
  }
  res.json(agenda);
});

export default router;
