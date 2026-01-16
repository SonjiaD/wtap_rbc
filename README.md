# Approachable - Confidence-First Mentorship Platform

> Go at your own pace. Building confidence through real human interaction.

## About

**Approachable** is a digital mentorship platform that transforms how people access mentorship by addressing the psychological barriers that prevent meaningful connections. Instead of generic matching algorithms, Approachable helps users clarify their goals, build confidence, and form mentorship relationships that feel natural and sustainable.

## The Idea & Reason

Living in the digital age can be both a blessing and a curse. While information and people are more accessible than ever, the abundance of online advice and surface-level connections has made it harder to genuinely access mentorship, build meaningful relationships, and support long-term growth.

Due to increasing reliance on AI assistants and lack of self-reflection:
- People feel anxious approaching those in higher positions
- They're unsure what they actually want out of mentorship
- Conversations feel awkward, transactional, or short-lived
- Many turn to the internet or AI to draft generic scripts, constantly molding themselves to what "everyone else" has done, instead of showing up as who they are

**Mentorship doesn't fail due to lack of access. It fails because people don't feel ready or confident to engage meaningfully.**

## Challenge & Solution

**Challenge**: Create a digital solution that enhances the mentorship experience in any context, whether personal, academic, professional or community-based. Your tool should help people more easily access mentorship, build meaningful connections, and support growth.

**Our Solution**: Approachable helps people create their own script - based on their own goals, challenges, and strengths - instead of telling users what to say.

### How We Solve It

#### Reflection-Based Quiz
Users complete a short quiz that prompts them to reflect on:
- Their challenges
- Personal and career goals
- Interests and hobbies

This clarifies what they want from mentorship before they ever reach out.

#### Intentional Matching
All users take the quiz and are matched with people who share similar interests or challenges. Mentors are matched just one level above the user, making conversations feel approachable, not intimidating.

#### Confidence-Building Connections
Users initially connect with mentors slightly ahead of them. As they build more connections, they unlock access to people at higher levels, gradually reducing anxiety and building confidence over time.

#### Mutual Verification & Network Growth
When two users confirm they've chatted, they mutually unlock access to each other's networks, encouraging real, meaningful engagement rather than one-off conversations.

## Impact

The value Approachable creates by:
- **Improving access to mentorship** through psychological preparation and confidence-building
- **Enhancing mentorship quality** by fostering genuine, reflective conversations
- **Supporting meaningful growth** for mentors and mentees across personal, academic, professional, and community contexts

## Innovation

Approachable's originality lies in its focus on the human side of mentorship technology. While most platforms focus on algorithms and AI generation, we prioritize:
- **Self-reflection over automation**
- **Gradual confidence building over instant matching**
- **Authentic relationship development over transactional connections**
- **Technology that prompts human insight rather than replacing it**

## Use of Technology

Our technical implementation effectively leverages modern web technologies to solve the mentorship confidence problem:

- **React 18 + Vite**: Fast, interactive user experience for reflection and matching
- **Node.js/Express**: Scalable backend for survey processing and mentor matching
- **Tailwind CSS + Framer Motion**: Beautiful, animated interface that feels supportive
- **Progressive Web App**: Accessible across devices for anytime confidence building

## Main Goals & Targets

1. **"I don't know what I actually want from the mentorship conversation"**
   - Clarify user goals for mentorship relationships
   - Develop foundation for meaningful conversation

2. **"I find it hard to build a connection with my mentor that doesn't feel transactional"**
   - Match mentors with mentees who have similar interests
   - Encourage authentic relationship development

3. **"I feel anxious speaking to people in a higher position than me"**
   - Build confidence through gradual networking progression
   - Provide psychological preparation tools

## Statistics & Problem Validation

*[Statistics proving the problem exists would be inserted here]*

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: JSON-based (easily replaceable with MongoDB/PostgreSQL)
- **Deployment**: Ready for Vercel/Netlify + Railway/Render

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
git clone <repo-url>
cd approachable
npm run install:all
```

### Development
```bash
npm run dev  # Runs both frontend (port 5176) and backend (port 3001)
```

Open http://localhost:5176 to see the application.

## Features

- **Challenge Survey** - Multi-step assessment to understand networking anxieties
- **Smart Matching** - Level-based mentor matching with shared interests
- **AI Email Generator** - Personalized outreach message creation
- **Coffee Chat Prep** - Agenda, questions, and talking points
- **Reflection System** - Post-chat anxiety tracking and growth monitoring
- **Progress Dashboard** - Confidence journey visualization

## API Endpoints

- `POST /api/survey/submit` - Submit user profile and preferences
- `POST /api/mentors/match` - Get personalized mentor matches
- `POST /api/email/generate` - Create outreach messages
- `POST /api/prep/generate` - Generate conversation preparation
- `POST /api/reflection/submit` - Track post-chat growth

## License

MIT
