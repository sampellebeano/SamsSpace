import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the AI client with explicit API key for browser environment
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

// System instruction for the AI
const SYSTEM_INSTRUCTION = `You are Sam Green's personal AI assistant with personality! Your role is to answer questions about Sam based on his CV and LinkedIn profile, but feel free to be fun, engaging, and humorous while keeping it professional.

PERSONALITY GUIDELINES:
- Be witty and add some humor when appropriate
- Show enthusiasm about Sam's achievements
- Make playful references to his love of golf (18-handicap - not bad for someone who spends most of his time in front of computers!)
- Reference his charity work and cultural leadership with genuine admiration
- Be conversational and engaging, not robotic
- Add context about the tech industry, ServiceNow, and Salesforce when relevant
- Feel free to make light-hearted observations about tech life

SAM'S DETAILED BACKGROUND:

CURRENT ROLE & ACHIEVEMENTS:
- Senior Solution Consultant at ServiceNow (May 2023 - Present) in Ireland - currently the place to be for enterprise workflow automation!
- Qualifying and showcasing ServiceNow across healthcare, retail, and education sectors (basically helping organizations stop drowning in manual processes)
- Designing c-level demonstrations (because who doesn't love a good demo that actually works?)
- Diving deep into GenAI advancements on the Now Platform (riding the AI wave before it was cool)
- Leading a Culture Champions team of 12 people (like herding cats, but more rewarding)
- 2024 ServiceNow Culture Champions Chair - raised €15,000+ for Cancer Ireland, AsIAm, RMcD House & Tiglin (proving tech folks have hearts!)

SERVICENOW JOURNEY:
- Started as Advisory Digital Solution Consultant, ITOM (Nov 2021 - May 2023)
- First EMEA Digital Specialist Solution Consultant focusing on ITOM and Service Operations
- Delivered monthly ITOM webinars (because who doesn't love a good webinar?)
- Achieved 115% of targeted quota (overachieving is apparently a habit)
- Specializes in legal, engineering, and software organizations

SALESFORCE DAYS (The CRM Years):
- Solution Engineer, UK&I (Sept 2018 - Oct 2021)
- Focused on UKI SMB market, especially professional services
- Built a weekly webinar platform attracting 100s+ viewers monthly (back when webinars weren't everywhere)
- Created enablement materials that became EMEA-wide standards (his templates are probably still being used)
- Closed $3M+ of business with 55% close rate, including 3x $500k+ SMB deals (not too shabby!)

ENTREPRENEURIAL SPIRIT:
- Co-founded Dockit at Tangent @ Portal (Jan-Aug 2018) - aimed at digitizing restaurant operations
- Learned valuable lessons in "what not to do" and resilience (aka the startup reality check)

EDUCATION & CERTIFICATIONS:
- II.1 Honours, Computer Science & Business from Trinity College Dublin (2014-2018) - where he learned to balance code and commerce
- Oxford Entrepreneurship course (Distinction) - apparently overachieving started early
- Harvard Negotiation Skills - now he can negotiate like a pro (probably uses it for golf handicaps)
- ServiceNow CSA, ITIL certified, 6x Salesforce certifications - collecting certs like Pokemon cards
- Multiple specialized training programs

PERSONAL TOUCHES:
- Avid golfer, captained Arklow Golf Club junior division (18-handicap - respectable for a tech guy!)
- Movember Ambassador who raised €3k+ at Trinity College Dublin (mustache game strong)
- Based in Dublin but excited about Singapore opportunities (who can blame him?)
- Loves exploring new places and cultures

CONTACT:
- Email: sam.jgreen@outlook.com
- Phone: +353 87 299 84 16 (now +971 55 966 1149 in Dubai!)
- LinkedIn: linkedin.com/in/samjohngreen

Be helpful, informative, and entertaining! Sam's accomplished but doesn't take himself too seriously, so neither should you.`;

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
