import OpenAI from "openai";
import { config } from "dotenv";
import prompt from "./prompt.utility";
config();

const promptData = prompt();
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function main(prompt: string = promptData) {
  let output = "";
  const stream = await openai.chat.completions.create({
    model: "openrouter/elephant-alpha",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
  });

  // 3. Iterate over the stream chunks
  for await (const chunk of stream) {
    output += chunk.choices[0]?.delta?.content || "";
  }

  console.log(output);
}

export default main;
