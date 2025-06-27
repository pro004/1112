const meta = {
  name: "ai21-jamba-forward",
  version: "1.0.0",
  description: "Forwards user input to AI21 Jamba 1.6 Large API and returns its raw response",
  author: "Xrotick",
  method: "get",
  category: "proxy",
  path: "/ai21-jamba-forward?prompt=&uid=&system="
};

async function onStart({ req, res }) {
  const fetch = require("node-fetch");

  const { prompt, uid, system } = req.query;

  if (!prompt || !uid || !system) {
    return res.status(400).json({
      error: "Missing required query parameters: prompt, uid, and system"
    });
  }

  const targetUrl = `https://zaikyoov3.koyeb.app/api/ai21-jamba-1.6-large?prompt=${encodeURIComponent(prompt)}&uid=${encodeURIComponent(uid)}&system=${encodeURIComponent(system)}`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();

    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch from AI21 Jamba API",
      details: error.message
    });
  }
}

module.exports = { meta, onStart };
