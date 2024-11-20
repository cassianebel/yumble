const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    const apiKey = process.env.EDAMAM_API_KEY;
    const appId = process.env.EDAMAM_APP_ID;
    const url = `https://api.edamam.com/api/recipes/v2?type=public&random=true&app_id=${appId}&app_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error fetching recipes: ${data.message}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch recipes" }),
    };
  }
};
