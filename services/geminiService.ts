import { GoogleGenAI, Type } from "@google/genai";
import { Product, GroundingSource } from "../types";
import { PRODUCTS } from "../constants";

// Strictly follow the rule: Use process.env.API_KEY directly in the constructor.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getShoppingAssistantResponse = async (userQuery: string, cartItems: string[]) => {
  const model = "gemini-3-flash-preview";
  
  const productContext = PRODUCTS.map(p => 
    `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Price: KES ${p.price}, Description: ${p.description}`
  ).join("\n");

  const systemInstruction = `
    You are Nova, the high-end Personal Shopping Assistant for Susan's Market. 
    Our catalog features elite hardware, premium fashion, and curated lifestyle products.
    
    Current Catalog context:
    ${productContext}
    
    User's Current Cart IDs: [${cartItems.join(", ")}]

    Your Persona:
    - Sophisticated, helpful, and knowledgeable about luxury trends and hardware specs.
    - Always recommend items specifically from our current catalog using their names and prices.
    - Use the Google Search tool for real-time market trends, tech specs, or comparing our prices with global standards.
    - If you find external info via search, mention it but prioritize our shop's availability.
    - Remind users we accept M-Pesa, PayPal, and Cards.
    - Keep answers concise, formatted for high readability.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: userQuery,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    const sources: GroundingSource[] = [];
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const chunks = groundingMetadata?.groundingChunks;
    
    if (chunks && Array.isArray(chunks)) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    return {
      text: response.text || "I'm sorry, I couldn't process that request right now.",
      sources: sources.length > 0 ? sources : undefined
    };
  } catch (error: any) {
    console.error("Gemini Assistant Error Details:", error);
    // Provide a more helpful error for development/deployment debugging without leaking secrets
    return {
      text: `My apologies. I encountered an issue: ${error?.message || "Internal Service Error"}. Please ensure your API deployment has a valid KES Project key configured.`
    };
  }
};

export const getStyleHubRecommendations = async (styleDescription: string) => {
  const model = "gemini-3-flash-preview";
  
  const productContext = PRODUCTS.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    desc: p.description
  }));

  const systemInstruction = `
    You are the Style Consultant for Susan's Market.
    Analyze the user's vibe and return exactly 4 product IDs from our catalog that best match their description.
    
    Catalog: ${JSON.stringify(productContext)}

    Output ONLY a raw JSON array of the 4 most relevant product IDs.
    No other text. Example: ["id1", "id2", "id3", "id4"]
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: styleDescription,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    const text = response.text || "[]";
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const ids = JSON.parse(jsonStr);
    return PRODUCTS.filter(p => ids.includes(p.id));
  } catch (error) {
    console.error("Style Hub AI Error:", error);
    return [];
  }
};
