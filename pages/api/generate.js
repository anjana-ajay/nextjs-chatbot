import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Parse the JSON body manually in Pages Router
      const data = req.body;

      // Access your API key by creating an instance of GoogleGenerativeAI
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      // Extract the prompt from the request body
      const prompt = data.body;

      // Initialize the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Generate content using the prompt
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const output = await response.text();

      // Send the generated output as a JSON response
      res.status(200).json({ output });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
