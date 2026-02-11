import { GoogleGenAI, Type } from "@google/genai";
import { Product, GroundingSource } from "../types";
import { PRODUCTS } from "../constants";

// The API Key is obtained from the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getShoppingAssistantResponse = async (userQuery: string, cartItems: string[]) => {
  const model = "gemini-3-flash-preview";
  
  const productContext = PRODUCTS.map(p => 
    `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Price: KES ${p.price}, Description: ${p.description}`
  ).join("\n");

  const systemInstruction = `
    You are the Personal AI Assistant for Susan's Online Shopping Platform. 
    Our catalog includes high-quality Shoes, Electronics, Accessories, Fashion, Jewelry, Hair Care, and Body Care.
    
    Current Catalog:
    ${productContext}
    
    User's Current Cart IDs: [${cartItems.join(", ")}]

    Response Requirements:
    1. Be friendly, professional, and helpful. Mention you are Susan's Shopping Assistant.
    2. Suggest 1-3 specific products from our catalog if the user asks for recommendations.
    3. Use your Google Search tool to answer questions about external trends, price comparisons, or product reviews.
    4. If using Google Search, the results will be used to ground your answer.
    5. We accept M-Pesa, PayPal, and Visa/Mastercard.
    6. Keep responses concise but stylish.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: userQuery,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for the assistant to ensure fast response times
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
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      text: "I am having some trouble connecting to my brain. Please check your internet or try again later!"
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
    You are the 'Susan Style Expert'. Users will describe an occasion or a vibe.
    Select exactly 3-4 products from our catalog that fit this vibe best.
    
    Catalog Summary:
    ${JSON.stringify(productContext)}

    Output ONLY a JSON array of the product IDs selected. No text or markdown.
    Example: ["k1", "j1", "f1"]
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: styleDescription,
      config: {
        systemInstruction,
        responseMimeType: "application/json"
      },
    });

    const text = response.text || "[]";
    const ids = JSON.parse(text.trim());
    return PRODUCTS.filter(p => ids.includes(p.id));
  } catch (error) {
    console.error("Gemini Style Hub Error:", error);
    return [];
  }
};