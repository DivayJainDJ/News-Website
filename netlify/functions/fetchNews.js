const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const API_KEY = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
