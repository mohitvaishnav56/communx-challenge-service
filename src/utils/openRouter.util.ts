import OpenAI from "openai";
import 'dotenv/config'; // Modern way to load dotenv
import promptLoader from "./prompt.utility";
import { models } from "../constants/ai.constants";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // Required by some OpenRouter models
    "X-Title": "CommunX Service",
  }
});

async function main(prompt: string = promptLoader()) {
  let output = "";
  let success = false;

  // Loop through your models as fallbacks
  for (const model of models) {
    if (success) break;

    try {
      console.log(`Attempting with model: ${model}`);
      const stream = await openai.chat.completions.create({
        model: model,
        messages: [{ role: "user", content: prompt }],
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        output += content;
        process.stdout.write(content); // See it in real-time
      }

      success = true; // If we get here, the stream finished successfully
    } catch (err: any) {
      console.error(`Error with ${model}:`, err.message);
      // If it's a 401, switching models won't help—it's an auth issue
      if (err.status === 401) {
        console.error("Critical: Check your OPENROUTER_API_KEY in .env");
        return; 
      }
      console.log("Trying next model...");
    }
  }

  console.log("\nFinal Output Captured.");
  return output;
}

export default main;