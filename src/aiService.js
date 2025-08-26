import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the AI client with explicit API key for browser environment
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

// System instruction for the AI
const SYSTEM_INSTRUCTION = `You are Sam Green's personal AI assistant. Your role is to answer questions about Sam based ONLY on the information provided in his CV and LinkedIn profile.

GUARDRAILS:
- Only use information from Sam's CV and professional background
- Do not provide information about other people or topics unrelated to Sam
- Maintain a professional and respectful tone at all times
- Do not use inappropriate language or make negative comments about anyone
- If asked about something not in Sam's professional background, politely redirect to relevant topics
- Keep responses concise and helpful
- Do not make up or infer information not explicitly stated in Sam's background

SAM'S BACKGROUND (from CV):
- Senior Solution Consultant at ServiceNow (May 2023 - Present) in Ireland
- Previous role: Advisory Digital Solution Consultant, ITOM at ServiceNow (Nov 2021 - May 2023)
- Former Solution Engineer at Salesforce (Sept 2018 - Oct 2021) in UK&I
- Co-founded startup Dockit as Entrepreneur in Residence at Tangent @ Portal (Jan 2018 - Aug 2018)
- Education: II.1 Honours, Computer Science & Business from Trinity College Dublin (2014-2018)
- Additional qualifications: Oxford Entrepreneurship course, Harvard Negotiation Skills, various ServiceNow and Salesforce certifications
- Location: Dublin, Ireland, interested in opportunities in Singapore
- 2024 ServiceNow Culture Champions Chair, raised €15,000+ for charities
- Avid golfer, Movember Ambassador
- Contact: sam.jgreen@outlook.com, +353 87 299 84 16
- LinkedIn: linkedin.com/in/samjohngreen

Focus on helping people learn about Sam's professional experience, skills, achievements, and background.`;

class AIService {
    constructor() {
        this.model = null;
        this.chat = null;
        this.initializeModel();
    }

    async initializeModel() {
        try {
            // Check if API key exists
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error("VITE_GEMINI_API_KEY not found in environment variables");
            }

            console.log("Initializing AI model with API key:", apiKey.substring(0, 10) + "...");

            this.model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction: SYSTEM_INSTRUCTION,
            });

            this.chat = this.model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: "Hello, I'd like to know about Sam Green." }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Hello! I'm Sam Green's AI assistant. I'm here to help answer questions about Sam's professional background, experience, and skills. What would you like to know about Sam?" }],
                    },
                ],
            });

            console.log("AI model initialized successfully");
        } catch (error) {
            console.error("Failed to initialize AI model:", error);
            throw error;
        }
    }

    async sendMessage(userMessage) {
        try {
            // Check if API key is available
            if (!import.meta.env.VITE_GEMINI_API_KEY) {
                throw new Error("API key not configured");
            }

            if (!this.chat) {
                await this.initializeModel();
            }

            if (!this.chat) {
                throw new Error("Failed to initialize chat model");
            }

            const result = await this.chat.sendMessage(userMessage);
            const response = await result.response;
            const text = response.text();

            // Log successful API call for debugging
            console.log("AI Response received:", text.substring(0, 100) + "...");

            return text;
        } catch (error) {
            console.error("Error sending message to AI:", error);

            // Only use fallback if there's a real API issue
            return `I'm sorry, I'm experiencing technical difficulties with my AI service. Error: ${error.message}. Please check that the API key is properly configured and try again.`;
        }
    }

    // Method to check if API key is configured
    isConfigured() {
        return !!(import.meta.env.VITE_GEMINI_API_KEY);
    }
}

// Export a singleton instance
export const aiService = new AIService();
export default aiService;
