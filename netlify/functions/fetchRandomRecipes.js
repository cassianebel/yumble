exports.handler = async (event, context) => {
  const fetch = (await import("node-fetch")).default;
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/random?number=20&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: `HTTP error! status: ${response.status}`,
        }),
      };
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.recipes),
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
