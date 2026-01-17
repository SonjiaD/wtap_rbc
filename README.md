# 🤝 Approachable - Confidence-First Mentorship Platform

> 🐾 Go at your own pace. Building confidence through real human interaction.

## 📖 About

**Approachable** is a digital mentorship platform that transforms how people access mentorship by addressing the psychological barriers that prevent meaningful connections. Instead of generic matching algorithms, Approachable helps users clarify their goals, build confidence, and form mentorship relationships that feel natural and sustainable.

## 💡 The Idea & Reason

Living in the digital age can be both a blessing and a curse. While information and people are more accessible than ever, the abundance of online advice and surface-level connections has made it harder to genuinely access mentorship, build meaningful relationships, and support long-term growth.

Due to increasing reliance on AI assistants and lack of self-reflection:
- 😰 People feel anxious approaching those in higher positions
- 🤔 They're unsure what they actually want out of mentorship
- 💬 Conversations feel awkward, transactional, or short-lived
- 🤖 Many turn to the internet or AI to draft generic scripts, constantly molding themselves to what "everyone else" has done, instead of showing up as who they are

**🚫 Mentorship doesn't fail due to lack of access. It fails because people don't feel ready or confident to engage meaningfully.**

## 🎯 Challenge & Solution

**Challenge**: Create a digital solution that enhances the mentorship experience in any context, whether personal, academic, professional or community-based. Your tool should help people more easily access mentorship, build meaningful connections, and support growth.

**Our Solution**: Approachable helps people create their own script - based on their own goals, challenges, and strengths - instead of telling users what to say.

### 🔧 How We Solve It

#### 📝 Reflection-Based Quiz
Users complete a short quiz that prompts them to reflect on:
- Their challenges
- Personal and career goals
- Interests and hobbies

This clarifies what they want from mentorship before they ever reach out.

#### 🎯 Intentional Matching
All users take the quiz and are matched with people who share similar interests or challenges. Mentors are matched just one level above the user, making conversations feel approachable, not intimidating.

#### 📈 Confidence-Building Connections
Users initially connect with mentors slightly ahead of them. As they build more connections, they unlock access to people at higher levels, gradually reducing anxiety and building confidence over time.

#### 🤝 Mutual Verification & Network Growth
When two users confirm they've chatted, they mutually unlock access to each other's networks, encouraging real, meaningful engagement rather than one-off conversations.

## 💎 Impact

The value Approachable creates by:
- **🎯 Improving access to mentorship** through psychological preparation and confidence-building
- **💬 Enhancing mentorship quality** by fostering genuine, reflective conversations
- **🌱 Supporting meaningful growth** for mentors and mentees across personal, academic, professional, and community contexts

## ✨ Innovation

Approachable's originality lies in its focus on the human side of mentorship technology. While most platforms focus on algorithms and AI generation, we prioritize:
- **🧠 Self-reflection over automation**
- **📊 Gradual confidence building over instant matching**
- **❤️ Authentic relationship development over transactional connections**
- **🛠️ Technology that prompts human insight rather than replacing it**

## 🛠️ Use of Technology

Our technical implementation effectively leverages modern web technologies and AI to solve the mentorship confidence problem:

- **🤖 Google Gemini 2.5 Flash Lite**: Advanced AI email personalization that creates authentic, mentor-specific outreach messages based on detailed user and mentor profiles (free tier with generous limits)
- **🔍 Google Custom Search API**: Real-time mentor discovery using Google search to find actual professionals in specific industries and locations
- **⚛️ React 18 + Vite 5**: Fast, interactive user experience for reflection and matching
- **🚀 Node.js/Express**: Scalable backend for survey processing and mentor matching
- **🎨 Tailwind CSS 3 + Framer Motion**: Beautiful, animated interface that feels supportive
- **🎯 Lucide React**: Clean, consistent iconography throughout the application
- **📱 Progressive Web App**: Accessible across devices for anytime confidence building

## 🎯 Main Goals & Targets

1. **❓ "I don't know what I actually want from the mentorship conversation"**
   - Clarify user goals for mentorship relationships
   - Develop foundation for meaningful conversation

2. **💔 "I find it hard to build a connection with my mentor that doesn't feel transactional"**
   - Match mentors with mentees who have similar interests
   - Encourage authentic relationship development

3. **😨 "I feel anxious speaking to people in a higher position than me"**
   - Build confidence through gradual networking progression
   - Provide psychological preparation tools

## 📊 Statistics & Problem Validation

- **85%** of professionals report that networking makes them feel anxious or uncomfortable (Source: LinkedIn Learning)
- **76%** of employees say they lack confidence when approaching senior colleagues for mentorship (Source: Harvard Business Review)
- **70%** of millennials and Gen Z workers want mentorship but don't know how to find it (Source: Deloitte Millennial Survey)
- **64%** of people experience "imposter syndrome" when reaching out to potential mentors (Source: Forbes)
- **Only 37%** of employees report having access to quality mentorship programs (Source: Gallup State of the Global Workplace)

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite 5** - Fast build tool and development server
- **React Router DOM 6** - Client-side routing
- **Tailwind CSS 3** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons

### Backend
- **Node.js** - JavaScript runtime (ES Modules)
- **Express 4** - Web framework for API routes
- **@google/generative-ai** - Gemini 2.5 Flash Lite for AI-powered email generation
- **googleapis** - Google Custom Search for real-time mentor discovery

### External APIs
- **Google Gemini AI** - Personalized email generation with context-aware prompts
- **Google Custom Search** - Real-time professional/mentor discovery

### Data & Deployment
- **JSON-based storage** - Lightweight, easily replaceable with MongoDB/PostgreSQL
- **Deployment ready** - Vercel/Netlify (frontend) + Railway/Render (backend)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Required for AI-powered email generation
GEMINI_API_KEY=your_gemini_api_key
USE_AI=true

# Optional: For real-time mentor discovery via Google Search
GOOGLE_SEARCH_API_KEY=your_google_api_key
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id

# Server config
PORT=3002
NODE_ENV=development
```

### Installation
```bash
git clone <repo-url>
cd approachable
npm run install:all
```

### Development
```bash
# Run frontend only (with API proxy to backend)
npm run dev

# Run backend separately in another terminal
npm run dev:backend
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3002

## Features

- **Reflection-Based Survey** - Multi-step assessment to understand networking anxieties, goals, and interests
- **Smart Mentor Matching** - Level-based mentor matching with shared interests and background
- **AI Email Generator** - Personalized outreach emails powered by Google Gemini 2.5 Flash Lite with multiple personality styles (direct, warm, curious, thoughtful)
- **Real-Time Mentor Discovery** - Find actual professionals via Google Custom Search integration
- **Coffee Chat Prep** - Agenda, questions, and talking points for meaningful conversations
- **Post-Chat Reflection** - Track anxiety levels and growth after mentor interactions
- **Progress Dashboard** - Visualize your confidence-building journey over time
- **Invite System** - Grow your network by inviting others to the platform

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /api/survey/submit` | Submit user profile and preferences |
| `POST /api/mentors/match` | Get personalized mentor matches |
| `POST /api/email/generate` | Generate AI-powered outreach email (Gemini) |
| `POST /api/email/variations` | Get email variations in all personality styles |
| `POST /api/prep/generate` | Generate conversation preparation materials |
| `POST /api/reflection/submit` | Track post-chat reflections and growth |
| `POST /api/mentor-search/search` | Search for real mentors via Google Custom Search |
| `POST /api/mentor-search/suggest` | Get AI-suggested mentors based on user profile |

## Project Structure

```
approachable/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-based page components
│   │   │   ├── Landing.jsx   # Home page
│   │   │   ├── Survey.jsx    # Reflection quiz
│   │   │   ├── Matches.jsx   # Mentor matches list
│   │   │   ├── MentorDetail.jsx
│   │   │   ├── EmailGenerator.jsx
│   │   │   ├── PrepChat.jsx
│   │   │   ├── Reflection.jsx
│   │   │   └── Progress.jsx
│   │   ├── App.jsx           # Main app with routing
│   │   └── main.jsx          # Entry point
│   └── vite.config.js        # Vite configuration
│
├── backend/                  # Express API server
│   └── src/
│       ├── routes/
│       │   ├── email.js      # AI email generation (Gemini)
│       │   ├── mentor-search.js  # Google Custom Search
│       │   ├── mentors.js    # Mentor matching
│       │   ├── prep.js       # Chat preparation
│       │   ├── reflection.js # Post-chat reflections
│       │   └── survey.js     # Survey submission
│       ├── data/
│       │   └── mentors.js    # Sample mentor data
│       ├── config.js         # Environment config
│       └── server.js         # Express server entry
│
└── package.json              # Root scripts for monorepo
```

## License

MIT
