# Launchpad - Confidence-First Coffee Chat Coach

> Turn anxiety into confident connections.

Launchpad is a web application designed to help students overcome social anxiety and build real professional relationships through mentorship. Instead of just matching students with mentors, Launchpad addresses the psychological barriers that prevent students from reaching out in the first place.

## The Problem

Most students don't struggle with *finding* mentors — they struggle with:
- Anxiety about reaching out
- Not knowing what to say
- Feeling unqualified or like an imposter
- Fear of being a burden
- Not knowing how to maintain relationships

## The Solution

Launchpad is a step-by-step system that:
1. **Identifies your challenges** - Understand what's holding you back
2. **Finds relatable people** - Connect with mentors who share your background
3. **Crafts your message** - Generate personalized outreach that sounds like you
4. **Prepares you for coffee chats** - Questions, talking points, and agenda
5. **Tracks your growth** - See your confidence increase over time

## Features

- **Challenge Survey** - Multi-step assessment to understand your networking anxieties
- **Smart Matching** - Find mentors based on industry, identity, and shared experiences
- **AI Email Generator** - Create personalized cold outreach messages
- **Coffee Chat Prep** - Suggested agenda, questions, and talking points
- **Reflection System** - Post-chat reflection to track anxiety levels and growth
- **Progress Dashboard** - Visualize your confidence journey with achievements

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd launchpad
```

2. Install all dependencies:
```bash
npm run install:all
```

Or install separately:
```bash
# Root dependencies
npm install

# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd ../frontend && npm install
```

3. Set up environment variables:
```bash
cd backend
cp .env.example .env
# Edit .env with your settings (optional: add OpenAI API key for AI features)
```

### Running the Application

Development mode (both frontend and backend):
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend (port 3001)
npm run dev:backend

# Terminal 2 - Frontend (port 5173)
npm run dev:frontend
```

Open http://localhost:5173 in your browser.

## Project Structure

```
launchpad/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express server entry
│   │   ├── routes/
│   │   │   ├── survey.js      # User profile & survey
│   │   │   ├── mentors.js     # Mentor matching
│   │   │   ├── email.js       # Email generation
│   │   │   ├── prep.js        # Coffee chat prep
│   │   │   └── reflection.js  # Post-chat reflection
│   │   └── data/
│   │       └── mentors.js     # Sample mentor data
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   └── Layout.jsx
│   │   └── pages/
│   │       ├── Landing.jsx
│   │       ├── Survey.jsx
│   │       ├── Matches.jsx
│   │       ├── MentorDetail.jsx
│   │       ├── EmailGenerator.jsx
│   │       ├── PrepChat.jsx
│   │       ├── Reflection.jsx
│   │       └── Progress.jsx
│   ├── index.html
│   └── package.json
└── package.json
```

## API Endpoints

### Survey
- `GET /api/survey/options` - Get survey options
- `POST /api/survey/submit` - Submit survey and create profile
- `GET /api/survey/profile/:userId` - Get user profile

### Mentors
- `GET /api/mentors` - Get all mentors
- `POST /api/mentors/match` - Get matched mentors
- `GET /api/mentors/:id` - Get single mentor

### Email
- `POST /api/email/generate` - Generate outreach email
- `POST /api/email/variations` - Get email style variations

### Prep
- `POST /api/prep/generate` - Generate coffee chat prep materials

### Reflection
- `POST /api/reflection/submit` - Submit post-chat reflection
- `GET /api/reflection/progress/:userId` - Get user progress
- `POST /api/reflection/outreach` - Log outreach sent

## Pitch

> "Raise your hand if you've ever wanted to reach out to someone on LinkedIn but felt too nervous to press send."

Most mentorship tools assume students are confident. But the students who need mentorship the most are often the ones too anxious to reach out. Launchpad doesn't just connect people — it transforms confidence.

## License

MIT
