import main from "../utils/openRouter.util";
import { createChallengeRepository, getLatestChallengeRepository } from "../repositories/challenge.repository";

export const generateAndStoreChallengeService = async () => {
  try {
    const aiOutput = await main();
    if (!aiOutput) {
      throw new Error("Failed to generate challenge from AI");
    }

    // Clean up potential markdown formatting from AI output
    const jsonString = aiOutput.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedData = JSON.parse(jsonString);

    const challenge = await createChallengeRepository(parsedData);
    return challenge;
  } catch (error) {
    console.error("Error in generateAndStoreChallengeService:", error);
    throw error;
  }
};

export const getLatestChallengeService = async () => {
  return await getLatestChallengeRepository();
};
