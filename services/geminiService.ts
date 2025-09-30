
import { GoogleGenAI } from "@google/genai";
import { getStoredApiKey } from "../components/ApiKeyConfig";

const getApiKey = (): string => {
  const apiKey = getStoredApiKey();
  if (!apiKey) {
    throw new Error("API key not configured. Please set your API key in the configuration.");
  }
  return apiKey;
};

const createAI = (): GoogleGenAI => {
  return new GoogleGenAI({ apiKey: getApiKey() });
};

const systemInstruction = `
You are an expert code reviewer AI. Your purpose is to provide a comprehensive, clear, and constructive code review.
When you receive a code snippet, analyze it thoroughly and provide feedback in well-structured Markdown format.

Your review should cover the following aspects:
1.  **Bugs & Potential Issues**: Identify any bugs, logical errors, or edge cases that might not be handled correctly.
2.  **Performance**: Point out any performance bottlenecks or suggest more efficient alternatives.
3.  **Readability & Style**: Comment on code style, naming conventions, and overall readability. Suggest improvements for clarity.
4.  **Best Practices & Suggestions**: Recommend modern language features, design patterns, or other best practices that could be applied.
5.  **Security**: Highlight any potential security vulnerabilities.

Structure your output using Markdown headings for each section (e.g., "### 🐛 Bugs & Potential Issues").
Use code blocks (\`\`\`) for code examples. Be polite and educational in your tone.
If the code is perfect, commend the user and explain why it's well-written.
`;

export const reviewCode = async (code: string): Promise<string> => {
  try {
    const ai = createAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: code,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get review from Gemini API. Please check your API key and network connection.");
  }
};
