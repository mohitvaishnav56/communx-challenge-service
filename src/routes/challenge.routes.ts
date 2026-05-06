import { Router } from "express";
import { getLatestChallengeController } from "../controllers/challenge.controller";

const router = Router();

router.get("/latest", getLatestChallengeController);

export default router;
