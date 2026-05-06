import prisma from "../prisma/prisma";
import type { Challenge } from "../generated/prisma/client";

export const createChallengeRepository = async (data: any) => {
  try {
    const baseChallenge = {
      title: data.title,
      description: data.description,
      type: data?.type,
      difficulty: data.difficulty,
      createdBy: "system",
      isAiGenerated: true,
    };

    if (data.type === "voice") {
      return await prisma.challenge.create({
        data: {
          ...baseChallenge,
          voiceConfig: {
            create: {
              durationMin: data.duration.min,
              durationMax: data.duration.max,
              primarySkill: data.primary_skill,
              secondarySkills: data.secondary_skills,
              scenario: data.scenario,
              examplePrompt: data.example_prompt,
              tags: data.tags,
              scoringWeights: data.scoring_weights,
            },
          },
        },
        include: {
          voiceConfig: true,
        },
      });
    }

    if (data.type === "writing") {
      return await prisma.challenge.create({
        data: {
          ...baseChallenge,
          writingConfig: {
            create: {
              taskType: data.task_type,
              wordLimitMin: data.word_limit.min,
              wordLimitMax: data.word_limit.max,
              tone: data.tone,
              primarySkill: data.primary_skill,
              secondarySkills: data.secondary_skills,
              scenario: data.scenario,
              expectedStructure: data.expected_structure,
              tags: data.tags,
              scoringWeights: data.scoring_weights,
            },
          },
        },
        include: {
          writingConfig: true,
        },
      });
    }

    throw new Error("Invalid challenge type");
  } catch (err) {
    console.error("Error creating challenge:", err);
    throw err;
  }
};

export const getChallengeByIdRepository = async (id: string) => {
  try {
    return await prisma.challenge.findFirst({
      include: {
        voiceConfig: true,
        writingConfig: true,
      },
    });
  } catch (err) {
    console.error("Error fetching challenge:", err);
    throw err;
  }
};

export const updateChallengeRepository = async (id: string, data: any) => {
  try {
    return await prisma.challenge.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
      },
    });
  } catch (err) {
    console.error("Error updating challenge:", err);
    throw err;
  }
};

export const deleteChallengeRepository = async (id: string) => {
  try {
    return await prisma.challenge.delete({
      where: { id },
    });
  } catch (err) {
    console.error("Error deleting challenge:", err);
    throw err;
  }
};

export const getLatestChallengeRepository = async () => {
  try {
    return await prisma.challenge.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        voiceConfig: true,
        writingConfig: true,
      },
    });
  } catch (err) {
    console.error("Error fetching latest challenge:", err);
    throw err;
  }
};
