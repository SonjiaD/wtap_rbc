import dotenv from 'dotenv';

// Load environment variables FIRST before any other imports
dotenv.config();

export const config = {
  port: process.env.PORT || 3002,
  geminiApiKey: process.env.GEMINI_API_KEY,
  useAI: process.env.USE_AI === 'true',
  googleSearchApiKey: process.env.GOOGLE_SEARCH_API_KEY,
  googleSearchEngineId: process.env.GOOGLE_SEARCH_ENGINE_ID,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};
