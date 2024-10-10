const apiKey = process.env.OPEN_WEATHER_MAP_API;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { message } = req.body;
      console.log("Received message from socket:", message);

      if (!apiKey) {
        throw new Error(
          "Missing OpenWeatherMap API key in environment variables."
        );
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${message}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const weatherData = await response.json();
      if (weatherData.count === 0) {
        return res.status(200).json({
          reply: `Sorry, I couldn't find weather information for "${message}". Please try another location.`,
        });
      }
      const { name, main, weather } = weatherData.list[0];
      const reply = `The weather in ${name} is currently experiencing ${weather[0].description}. The temperature is ${main.temp}°C, and it feels like ${main.feels_like}°C.`;

      res.status(200).json({ reply });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      res
        .status(500)
        .json({ reply: "There was an error processing your request." });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
