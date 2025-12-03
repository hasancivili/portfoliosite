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
    // NOTE: In a real production app, you might proxy this through a backend to hide the key.
    // For a static site/demo, we assume the environment variable is present or the user enters it.
    // Since this is a generated code response, we assume process.env.API_KEY is available.
    // Ideally, for a client-side only app, you might prompt the user for a key if it's missing.
    
    if (!process.env.API_KEY) {
        return "System Message: API Key is missing in the environment configuration. Please configure the REACT_APP_API_KEY or process.env.API_KEY.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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