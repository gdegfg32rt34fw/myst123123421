import { GoogleGenAI } from "@google/genai";

// Helper to get a fresh client instance with the latest API key
const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAiRecommendation = async (userQuery: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "Signature Mix | Secret House Blend, Mint Hint, Tropical Base | Our most popular blend perfect for any occasion. | Moroccan Mint Tea";
  }

  try {
    const ai = getAiClient();
    const model = ai.models;
    
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the Master Mixologist for MYST Lounge, a premium luxury shisha lounge.
      
      User Preferences: "${userQuery}"

      Your Task: Create a custom shisha mix recipe based on the preferences.
      
      CRITICAL CONSTRAINTS:
      1. Do NOT use brand names (e.g., Al Fakher, Adalya, Starbuzz) in the ingredients list. Only list the specific flavor names (e.g., "Blackberry", "Mint", "Passion Fruit", NOT "Al Fakher Blackberry").
      2. You must return the response in this EXACT format separated by pipes (|):
      Mix Name | Ingredients (percentage/parts) | Short Description (1 sentence) | Recommended Drink Pairing

      Example Output:
      Midnight Storm | 60% Blueberry, 40% Passion Fruit | A cooling blueberry storm with a tropical twist. | Mojito Refresher
      
      Inventory context: We have 200+ flavors. Vibe is dark, neon, luxury.
      `,
    });

    return response.text || "MYST Mystery | Chef's Choice | A surprise mix for the adventurous. | Ice Lemon Tea";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection Error | Please ask staff | Unable to reach the lab. | Water";
  }
};

export const generateVibeImage = async (
  prompt: string, 
  size: '1K' | '2K' | '4K'
): Promise<{ imageUrl: string | null, error?: string }> => {
  try {
    const ai = getAiClient();
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          { text: `High quality, cinematic, photorealistic image for a shisha lounge. ${prompt}. Dark, neon, luxurious atmosphere.` }
        ]
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: '16:9'
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return { imageUrl: `data:image/png;base64,${base64EncodeString}` };
      }
    }
    
    return { imageUrl: null, error: "No image generated." };
  } catch (error: any) {
    console.error("Image Generation Error:", error);
    return { imageUrl: null, error: error.message || "Failed to generate image." };
  }
};