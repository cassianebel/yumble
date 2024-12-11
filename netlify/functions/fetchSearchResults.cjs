const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { query, offset = 0, diet } = event.queryStringParameters;

    if (!query) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing query parameter" }),
      };
    }

    const apiKey = process.env.SPOONACULAR_API_KEY;

    const dietParam = diet ? `&diet=${encodeURIComponent(diet)}` : "";

    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
      query
    )}&offset=${offset}${dietParam}&apiKey=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Error fetching data from Spoonacular" }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
    };
  }
};
