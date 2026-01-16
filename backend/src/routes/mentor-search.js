import express from 'express';
import { google } from 'googleapis';

const router = express.Router();

// Initialize Google Custom Search
let customsearch = null;
if (process.env.GOOGLE_SEARCH_API_KEY && process.env.GOOGLE_SEARCH_ENGINE_ID) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account"
    },
    scopes: ['https://www.googleapis.com/auth/cse']
  });

  customsearch = google.customsearch({
    version: 'v1',
    auth: process.env.GOOGLE_SEARCH_API_KEY
  });
}

// Search for potential mentors using Google Custom Search
router.post('/search', async (req, res) => {
  const { query, industry, location = 'Canada', limit = 10 } = req.body;

  if (!customsearch) {
    return res.status(503).json({
      error: 'Google Search API not configured',
      message: 'Add GOOGLE_SEARCH_API_KEY and GOOGLE_SEARCH_ENGINE_ID to enable mentor discovery'
    });
  }

  try {
    // Build search query for finding professionals
    const searchQuery = `${query} ${industry} professional ${location} linkedin OR email OR contact`;

    const searchResponse = await customsearch.cse.list({
      cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
      q: searchQuery,
      num: Math.min(limit, 10), // Google limits to 10 results per request
      start: 1,
      fields: 'items(title,link,snippet,pagemap)'
    });

    const results = searchResponse.data.items || [];

    // Process and format the search results into mentor profiles
    const potentialMentors = results.map((result, index) => {
      const title = result.title || '';
      const link = result.link || '';
      const snippet = result.snippet || '';

      // Extract name from title (usually "Name - Title at Company")
      const nameMatch = title.match(/^([^-\|]+)/);
      const name = nameMatch ? nameMatch[1].trim() : `Professional ${index + 1}`;

      // Extract company/role from title
      const companyMatch = title.match(/at ([^-\|]+)/);
      const company = companyMatch ? companyMatch[1].trim() : 'Company';

      // Extract role from title
      const roleMatch = title.match(/- ([^-]+) at/);
      const role = roleMatch ? roleMatch[1].trim() : 'Professional';

      // Check if it's a LinkedIn profile
      const isLinkedIn = link.includes('linkedin.com');

      return {
        id: `google-${Date.now()}-${index}`,
        name: name,
        role: role,
        company: company,
        school: 'Unknown', // We can't determine this from search
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/\s+/g, '')}`,
        tags: ['Google Search Result', isLinkedIn ? 'LinkedIn Profile' : 'Web Result'],
        background: snippet.substring(0, 200) + '...',
        industries: [industry],
        source: 'google_search',
        contactUrl: link,
        reachOutHistory: 'Found via Google search',
        responseRate: 'Unknown',
        bio: `Professional found through Google search. ${snippet.substring(0, 150)}...`,
        matchReasons: [
          `Works in ${industry}`,
          `Found in ${location}`,
          `Professional experience in field`
        ]
      };
    });

    res.json({
      mentors: potentialMentors,
      totalResults: results.length,
      searchQuery: searchQuery,
      source: 'google_custom_search'
    });

  } catch (error) {
    console.error('Google Search API error:', error.message);
    res.status(500).json({
      error: 'Search failed',
      message: error.message,
      mentors: [] // Return empty array instead of failing completely
    });
  }
});

// Get mentor suggestions based on user profile
router.post('/suggest', async (req, res) => {
  const { user, industry, careerGoals } = req.body;

  if (!customsearch) {
    return res.status(503).json({
      error: 'Google Search API not configured'
    });
  }

  try {
    // Create targeted search queries based on user profile
    const queries = [
      `${careerGoals} professional ${industry} mentor Canada`,
      `${industry} expert ${user.school} alumni`,
      `${careerGoals} leader ${industry} Canada contact`
    ];

    const allResults = [];

    for (const query of queries) {
      try {
        const searchResponse = await customsearch.cse.list({
          cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
          q: query,
          num: 5,
          start: 1
        });

        const results = searchResponse.data.items || [];
        allResults.push(...results);
      } catch (err) {
        console.warn(`Query failed: ${query}`, err.message);
      }
    }

    // Remove duplicates and format
    const uniqueResults = allResults.filter((result, index, self) =>
      index === self.findIndex(r => r.link === result.link)
    );

    const mentors = uniqueResults.slice(0, 8).map((result, index) => ({
      id: `suggested-${Date.now()}-${index}`,
      name: result.title?.split(' - ')[0] || `Mentor ${index + 1}`,
      role: 'Professional',
      company: result.title?.match(/at ([^-\|]+)/)?.[1] || 'Company',
      school: 'Unknown',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${result.title?.substring(0, 10) || 'mentor'}`,
      tags: ['AI Suggested', 'Google Search'],
      background: `Suggested mentor based on your ${industry} interests and ${careerGoals} goals.`,
      industries: [industry],
      source: 'ai_suggested',
      contactUrl: result.link,
      matchReasons: [
        `Matches your ${careerGoals} goals`,
        `Experience in ${industry}`,
        `Found through targeted search`
      ],
      bio: result.snippet?.substring(0, 200) + '...'
    }));

    res.json({
      mentors,
      totalSuggestions: mentors.length,
      userProfile: {
        industry,
        careerGoals,
        school: user.school
      }
    });

  } catch (error) {
    console.error('Mentor suggestion error:', error.message);
    res.status(500).json({
      error: 'Suggestion failed',
      mentors: []
    });
  }
});

export default router;
