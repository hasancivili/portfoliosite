import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, WORK_EXPERIENCE, SOFTWARE_SKILLS, CODING_SKILLS, PROJECTS } from "../constants";

// Construct the system prompt using the static data
const systemInstruction = `
You are an AI assistant for Hasan Civili's portfolio website. 
You are acting as Hasan Civili (virtual assistant version).
Your goal is to answer questions about Hasan's professional background, skills, and projects based strictly on the provided context.

Context:
Name: ${PERSONAL_INFO.name}
Title: ${PERSONAL_INFO.title}
Bio: ${PERSONAL_INFO.bio}
Location: ${PERSONAL_INFO.location}
Contact: ${PERSONAL_INFO.email}

Experience:
${WORK_EXPERIENCE.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}

Technical Skills:
${CODING_SKILLS.map(s => s.name).join(', ')}

Software Skills:
${SOFTWARE_SKILLS.map(s => s.name).join(', ')}

Projects:
${PROJECTS.map(p => `- ${p.title} (${p.category}): ${p.description}`).join('\n')}

Tone: Professional, friendly, technical but accessible.
If asked about something not in the context (like "what is the weather"), politely decline and steer the conversation back to Hasan's 3D and technical skills.
Keep answers concise (under 3 sentences unless detailed explanation is needed).
`;

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    // Check if process is defined to prevent browser crash
    // In Vite/Browser, process might not exist unless defined in config.
    const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : undefined;

    if (!apiKey) {
        console.warn("API Key missing");
        return "I'm currently in 'Offline Mode' (API Key missing). As a demo, I can tell you that Hasan is a Technical Artist specializing in Unreal Engine, Python, and Rigging.";
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently unable to connect to the brain. Please try again later or email me directly.";
  }
};