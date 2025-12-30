
import { GoogleGenAI, Type } from "@google/genai";
import { GoldenPrompt } from "../types";

const PROMPT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    role: { type: Type.STRING, description: "A high-level persona with specific expertise." },
    objective: { type: Type.STRING, description: "A clear statement of what the AI must achieve." },
    context: { type: Type.STRING, description: "Relevant background information to set the scene." },
    constraints: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Strict Rules of Engagement (what to avoid, tone, length)."
    },
    instructions: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Step-by-Step Instructions: A Chain-of-Thought workflow for the AI to follow."
    },
    outputFormat: { type: Type.STRING, description: "A detailed breakdown of the desired structure (Markdown, JSON, Table, etc.)." }
  },
  required: ["role", "objective", "context", "constraints", "instructions", "outputFormat"],
  propertyOrdering: ["role", "objective", "context", "constraints", "instructions", "outputFormat"]
};

export const generateGoldenPrompt = async (userInput: string): Promise<GoldenPrompt> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Transform this request into a "Golden Prompt": "${userInput}"`,
    config: {
      systemInstruction: `You are the world's most advanced Prompt Engineer. 
      Your task is to take a raw user request and expand it into a sophisticated, professional "Golden Prompt".
      Use Chain-of-Thought reasoning to determine the best persona, constraints, and instructions.
      The output MUST strictly follow the provided JSON schema.
      Be highly specific, professional, and ensure the resulting prompt will work across all LLMs like Claude, GPT-4, and Gemini.`,
      responseMimeType: "application/json",
      responseSchema: PROMPT_SCHEMA,
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });

  const data = JSON.parse(response.text);
  
  return {
    ...data,
    id: Math.random().toString(36).substring(7),
    originalInput: userInput,
    timestamp: Date.now()
  };
};
