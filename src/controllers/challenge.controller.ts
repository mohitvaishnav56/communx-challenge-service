import { Request, Response } from "express";
import { getLatestChallengeService } from "../services/challenge.service";

export const getLatestChallengeController = async (req: Request, res: Response): Promise<any> => {
  try {
    const challenge = await getLatestChallengeService();
    if (!challenge) {
      return res.status(404).json({ success: false, message: "No challenge found" });
    }
    return res.status(200).json({ success: true, data: challenge });
  } catch (error: any) {
    console.error("Error in getLatestChallengeController:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
