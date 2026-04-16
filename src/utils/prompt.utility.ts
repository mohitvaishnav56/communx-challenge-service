// In your app, before calling the API
const typeVal = Math.random() < 0.5 ? "voice" : "writing";

const VOICE_SCHEMA_AND_CONSTRAINTS = `
SCHEMA:
{
  "type": "voice",
  "title": string,
  "description": string,
  "duration": { "min": integer, "max": integer },
  "primary_skill": string,
  "secondary_skills": [string, string],
  "example_prompt": string,
  "difficulty": string,
  "tags": [string],
  "scoring_weights": { [skill]: float, [skill]: float, [skill]: float }
}

CONSTRAINTS:
- title: 4–7 words, catchy and specific
- description: Must include (1) a realistic professional scenario, (2) a clear speaking task, (3) explicit skills to focus on
- duration.min / duration.max: Integers in seconds; min ≥ 60
- primary_skill: Exactly one from → Clarity, Tone, Pace, Pronunciation, Emotion, Fluency, Communication Style
- secondary_skills: Exactly 2 from the same list, different from primary_skill
- example_prompt: One sentence to help the user begin speaking
- difficulty: Exactly one of → beginner, intermediate, advanced
- tags: 2–3 lowercase keywords
- scoring_weights:
    • Exactly 3 keys from the allowed skills list
    • Each value float between 0.0 and 1.0
    • Must sum to EXACTLY 1.0
`;

const WRITING_SCHEMA_AND_CONSTRAINTS = `
SCHEMA:
{
  "type": "writing",
  "title": string,
  "description": string,
  "task_type": string,
  "word_limit": { "min": integer, "max": integer },
  "primary_skill": string,
  "secondary_skills": [string, string],
  "difficulty": string,
  "tone": string,
  "scenario": string,
  "expected_structure": [string],
  "tags": [string],
  "scoring_weights": { [skill]: float, [skill]: float, [skill]: float }
}

CONSTRAINTS:
- title: 4–7 words, descriptive and specific
- description: Must include (1) clear context, (2) a specific writing task, (3) explicit tone and purpose constraints
- task_type: Exactly one of → email, letter, report, dialogue, story
- word_limit.min / word_limit.max: Integers; min ≥ 50, max ≤ 300
- primary_skill: Exactly one from → Clarity, Grammar, Structure, Vocabulary, Creativity, Tone, Conciseness
- secondary_skills: Exactly 2 from the same list, different from primary_skill
- difficulty: Exactly one of → beginner, intermediate, advanced
- tone: Exactly one of → formal, semi-formal, informal, persuasive
- scenario: One paragraph describing a specific real-world workplace situation
- expected_structure: 3–4 ordered section labels
- tags: 2–3 lowercase keywords
- scoring_weights:
    • Exactly 3 keys from the allowed skills list
    • Each value float between 0.0 and 1.0
    • Must sum to EXACTLY 1.0
`;

// SHARED rules appended to both
const SHARED_RULES = `
DIFFICULTY GUIDELINES:
- beginner     → simple, personal, low-pressure, familiar setting
- intermediate → structured, professional, semi-formal context
- advanced     → high-stakes, persuasive, abstract, or complex scenario

QUALITY RULES:
- Must be specific and non-generic
- Topic must relate to professional communication, leadership, or workplace scenarios

OUTPUT: A single valid JSON object only.
`;

const prompt = (type: string = typeVal) => `
You are an expert communication coach for CommunX.

Generate exactly ONE unique ${type.toUpperCase()} challenge as a valid JSON object.
Output ONLY the JSON — no markdown, no explanation, no extra text.

${type === "voice" ? VOICE_SCHEMA_AND_CONSTRAINTS : WRITING_SCHEMA_AND_CONSTRAINTS}
`;

export default prompt;