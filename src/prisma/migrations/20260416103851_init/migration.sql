-- CreateEnum
CREATE TYPE "ChallengeType" AS ENUM ('voice', 'writing');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('beginner', 'intermediate', 'advanced');

-- CreateEnum
CREATE TYPE "EvaluationMode" AS ENUM ('ai', 'host', 'hybrid');

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ChallengeType" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "createdBy" TEXT,
    "isAiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "visibility" TEXT NOT NULL DEFAULT 'public',
    "evaluationMode" "EvaluationMode" NOT NULL DEFAULT 'ai',
    "deadline" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceChallengeConfig" (
    "id" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "durationMax" INTEGER NOT NULL,
    "primarySkill" TEXT NOT NULL,
    "secondarySkills" TEXT[],
    "scenario" TEXT NOT NULL,
    "examplePrompt" TEXT NOT NULL,
    "tags" TEXT[],
    "scoringWeights" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VoiceChallengeConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WritingChallengeConfig" (
    "id" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "taskType" TEXT NOT NULL,
    "wordLimitMin" INTEGER NOT NULL,
    "wordLimitMax" INTEGER NOT NULL,
    "tone" TEXT NOT NULL,
    "primarySkill" TEXT NOT NULL,
    "secondarySkills" TEXT[],
    "scenario" TEXT NOT NULL,
    "expectedStructure" TEXT[],
    "tags" TEXT[],
    "scoringWeights" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WritingChallengeConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VoiceChallengeConfig_challengeId_key" ON "VoiceChallengeConfig"("challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "WritingChallengeConfig_challengeId_key" ON "WritingChallengeConfig"("challengeId");

-- AddForeignKey
ALTER TABLE "VoiceChallengeConfig" ADD CONSTRAINT "VoiceChallengeConfig_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WritingChallengeConfig" ADD CONSTRAINT "WritingChallengeConfig_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
