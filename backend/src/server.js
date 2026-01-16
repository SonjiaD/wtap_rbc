import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import surveyRoutes from './routes/survey.js';
import mentorRoutes from './routes/mentors.js';
import emailRoutes from './routes/email.js';
import prepRoutes from './routes/prep.js';
import reflectionRoutes from './routes/reflection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/survey', surveyRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/prep', prepRoutes);
app.use('/api/reflection', reflectionRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Launchpad API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Launchpad API running on http://localhost:${PORT}`);
});
