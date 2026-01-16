import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini AI client (optional - will fall back to templates if not configured)
let genAI = null;
let model = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

// Email templates based on personality style
const emailTemplates = {
  direct: {
    subject: "Quick question about your career path",
    template: (user, mentor) => `Hi ${mentor.name},

I'm ${user.name}, a student at ${user.school} interested in ${user.industries?.[0] || 'your field'}. I came across your profile and noticed ${mentor.matchReasons?.[0]?.toLowerCase() || 'your impressive background'}.

Would you have 15 minutes for a quick call? I'd love to learn about your journey from ${mentor.school} to ${mentor.company}.

Thanks for considering,
${user.name}`
  },
  warm: {
    subject: "Fellow ${school} student hoping to connect",
    template: (user, mentor) => `Hi ${mentor.name},

I hope this message finds you well! My name is ${user.name}, and I'm currently a student at ${user.school}. I came across your profile and was really inspired by your journey.

${mentor.matchReasons?.[0] ? `I noticed that ${mentor.matchReasons[0].toLowerCase()}, which really resonated with me.` : `Your path from ${mentor.school} to ${mentor.company} is exactly the kind of journey I aspire to.`}

I'd be incredibly grateful if you had 15-20 minutes for a virtual coffee chat. I promise to come prepared and respect your time!

Warmly,
${user.name}`
  },
  curious: {
    subject: "Fascinated by your journey - would love to learn more",
    template: (user, mentor) => `Hi ${mentor.name},

I'm ${user.name} from ${user.school}, and I've been researching career paths in ${user.industries?.[0] || 'your field'}. Your journey particularly caught my attention.

I have so many questions about how you got from ${mentor.school} to ${mentor.role} at ${mentor.company}! ${mentor.matchReasons?.[0] ? `The fact that ${mentor.matchReasons[0].toLowerCase()} makes me think you might have unique insights.` : ''}

Would you be open to a short conversation? I'd love to hear your story.

Curious and grateful,
${user.name}`
  },
  thoughtful: {
    subject: "Thoughtful request for mentorship conversation",
    template: (user, mentor) => `Dear ${mentor.name},

My name is ${user.name}, and I am a student at ${user.school} exploring career opportunities in ${user.industries?.[0] || 'your industry'}.

After researching professionals in this space, your background stood out to me. ${mentor.matchReasons?.[0] ? `Specifically, ${mentor.matchReasons[0].toLowerCase()}.` : `Your progression from ${mentor.school} to ${mentor.role} at ${mentor.company} represents a path I find compelling.`}

I have prepared several specific questions about:
- Your transition from university to your current role
- Skills you found most valuable
- Advice for someone starting their journey

Would you be willing to share 15-20 minutes of your time for a brief conversation?

With appreciation,
${user.name}`
  }
};

// Generate email using AI or templates
router.post('/generate', async (req, res) => {
  const { user, mentor, personalityStyle = 'warm' } = req.body;

  // Add match reasons to mentor object if not present
  const mentorWithReasons = {
    ...mentor,
    matchReasons: mentor.matchReasons || ["they work in a field you're interested in"]
  };

  try {
    // Try AI generation if Gemini is configured
    if (model && process.env.USE_AI === 'true') {
      const prompt = `You are an expert career counselor helping students write authentic, personalized cold outreach emails to potential mentors.

Generate a compelling cold outreach email for a student reaching out to a professional mentor. The email should feel genuine, respectful, and confident - not generic or robotic.

STUDENT PROFILE:
- Name: ${user.name}
- School: ${user.school}
- Academic interests/career goals: ${user.industries?.join(', ') || 'professional development'}
- Communication style preference: ${personalityStyle}
- Main anxieties/challenges: ${user.anxieties?.join(', ') || 'building professional connections'}

MENTOR PROFILE:
- Name: ${mentor.name}
- Current role: ${mentor.role} at ${mentor.company}
- Education: ${mentor.school}
- Professional background: ${mentor.background || 'experienced professional'}
- Why they match this student: ${mentorWithReasons.matchReasons.join(', ')}

WRITING REQUIREMENTS:
1. **Authenticity**: Write as if the student is genuinely excited about this specific person's journey
2. **Personalization**: Reference specific details about the mentor's background or the matching reasons
3. **${personalityStyle.toUpperCase()} TONE**: ${personalityStyle === 'direct' ? 'Professional and concise' : personalityStyle === 'warm' ? 'Friendly and enthusiastic' : personalityStyle === 'curious' ? 'Inquisitive and engaged' : 'Thoughtful and reflective'}
4. **Clear Value Exchange**: Show what the student brings to the conversation (preparedness, enthusiasm, fresh perspective)
5. **Small, Specific Ask**: Request 15-20 minutes for a focused conversation
6. **Word Count**: Keep under 150 words total

RESPONSE FORMAT:
Return only valid JSON with this exact structure:
{
  "subject": "Brief, compelling subject line (under 60 characters)",
  "body": "The complete email body with proper greeting and signature"
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const generated = JSON.parse(response.text());

      return res.json({
        subject: generated.subject,
        body: generated.body,
        source: 'ai'
      });
    }

    // Fall back to templates
    const template = emailTemplates[personalityStyle] || emailTemplates.warm;
    const body = template.template(user, mentorWithReasons);
    const subject = template.subject
      .replace('${school}', mentor.school)
      .replace('${company}', mentor.company);

    res.json({
      subject,
      body,
      source: 'template'
    });

  } catch (error) {
    console.error('Email generation error:', error.message);

    // Enhanced fallback with better error messages
    const template = emailTemplates[personalityStyle] || emailTemplates.warm;
    const body = template.template(user, mentorWithReasons);
    const subject = template.subject
      .replace('${school}', mentor.school || 'your alma mater')
      .replace('${company}', mentor.company || 'your company');

    res.status(error.status || 500).json({
      subject,
      body,
      source: 'template',
      error: process.env.NODE_ENV === 'development' ? error.message : 'AI generation failed, using template'
    });
  }
});

// Get email variations
router.post('/variations', (req, res) => {
  const { user, mentor } = req.body;

  const variations = Object.entries(emailTemplates).map(([style, template]) => ({
    style,
    subject: template.subject
      .replace('${school}', mentor.school)
      .replace('${company}', mentor.company),
    body: template.template(user, {
      ...mentor,
      matchReasons: mentor.matchReasons || ["they work in a field you're interested in"]
    })
  }));

  res.json({ variations });
});

export default router;
