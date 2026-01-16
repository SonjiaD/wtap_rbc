import { config } from './config.js';

import express from 'express';
import cors from 'cors';
import surveyRoutes from './routes/survey.js';
import mentorRoutes from './routes/mentors.js';
import emailRoutes from './routes/email.js';
import prepRoutes from './routes/prep.js';
import reflectionRoutes from './routes/reflection.js';
import mentorSearchRoutes from './routes/mentor-search.js';

console.log('🔍 Environment check:');
console.log('PORT:', config.port);
console.log('GEMINI_API_KEY exists:', !!config.geminiApiKey);
console.log('USE_AI:', config.useAI);

const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/survey', surveyRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/prep', prepRoutes);
app.use('/api/reflection', reflectionRoutes);
app.use('/api/mentor-search', mentorSearchRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Launchpad API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Launchpad API running on http://localhost:${PORT}`);
});
