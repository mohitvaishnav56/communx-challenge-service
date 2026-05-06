import cron from "node-cron";
import { generateAndStoreChallengeService } from "../services/challenge.service";

export const initCronJobs = () => {
  // Run at 9:00 AM every day
  cron.schedule("0 9 * * *", async () => {
    console.log("[Cron] Running morning challenge generation...");
    try {
      await generateAndStoreChallengeService();
      console.log("[Cron] Morning challenge generated successfully.");
    } catch (error) {
      console.error("[Cron] Failed to generate morning challenge:", error);
    }
  });

  // Run at 9:00 PM every day
  cron.schedule("0 21 * * *", async () => {
    console.log("[Cron] Running evening challenge generation...");
    try {
      await generateAndStoreChallengeService();
      console.log("[Cron] Evening challenge generated successfully.");
    } catch (error) {
      console.error("[Cron] Failed to generate evening challenge:", error);
    }
  });

  console.log("Cron jobs initialized.");
};
