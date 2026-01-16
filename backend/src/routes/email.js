import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// Initialize OpenAI client (optional - will fall back to templates if not configured)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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
    // Try AI generation if OpenAI is configured
    if (openai && process.env.USE_AI === 'true') {
      const prompt = `Generate a cold outreach email for a student reaching out to a professional mentor.

Student info:
- Name: ${user.name}
- School: ${user.school}
- Interested in: ${user.industries?.join(', ') || 'their field'}
- Communication style: ${personalityStyle}
- Main anxieties: ${user.anxieties?.join(', ') || 'reaching out'}

Mentor info:
- Name: ${mentor.name}
- Role: ${mentor.role} at ${mentor.company}
- School: ${mentor.school}
- Background: ${mentor.background}
- Why they match: ${mentorWithReasons.matchReasons.join(', ')}

Write a ${personalityStyle} email that:
1. Is authentic and not robotic
2. Mentions a specific connection point
3. Makes a clear, small ask (15-20 min chat)
4. Is under 150 words

Return JSON with "subject" and "body" fields.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      });

      const generated = JSON.parse(completion.choices[0].message.content);
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
    console.error('Email generation error:', error);
    // Fall back to templates on error
    const template = emailTemplates.warm;
    res.json({
      subject: template.subject.replace('${school}', mentor.school),
      body: template.template(user, mentorWithReasons),
      source: 'template'
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
