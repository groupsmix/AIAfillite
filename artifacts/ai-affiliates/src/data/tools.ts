import { IconType } from "react-icons";
import { 
  SiOpenai, SiAnthropic, SiNotion, SiZapier, SiGithub,
  SiReplit, SiMake
} from "react-icons/si";

export type Category = "Writing" | "Image Generation" | "Video" | "SEO" | "Coding" | "Productivity";
export type PricingModel = "Free" | "Freemium" | "Paid";

export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: Category;
  pricing: {
    model: PricingModel;
    priceString: string;
  };
  affiliateUrl: string;
  website: string;
  rating: number;
  features: string[];
  pros: string[];
  cons: string[];
  logo?: IconType;
}

export const tools: Tool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    slug: "chatgpt",
    tagline: "The conversational AI that started it all.",
    description: "OpenAI's flagship language model, offering powerful capabilities for text generation, analysis, and problem-solving across domains.",
    category: "Writing",
    pricing: { model: "Freemium", priceString: "$20/mo for Plus" },
    affiliateUrl: "/go/chatgpt",
    website: "https://chatgpt.com",
    rating: 4.8,
    features: ["Advanced reasoning", "Code generation", "Data analysis", "Custom GPTs"],
    pros: ["Extremely versatile", "Large context window in latest models", "Extensive plugin ecosystem"],
    cons: ["Can sometimes hallucinate facts", "Knowledge cutoff limitations without web access"],
    logo: SiOpenai
  },
  {
    id: "claude",
    name: "Claude",
    slug: "claude",
    tagline: "Constitutional AI designed for safety and nuance.",
    description: "Anthropic's LLM excels at long-form analysis, coding, and maintaining nuanced tone without excessive refusal rates.",
    category: "Writing",
    pricing: { model: "Freemium", priceString: "$20/mo for Pro" },
    affiliateUrl: "/go/claude",
    website: "https://claude.ai",
    rating: 4.9,
    features: ["200K token context window", "Artifacts for coding/UI", "Nuanced writing tone", "Document analysis"],
    pros: ["Best-in-class coding abilities (Sonnet 3.5)", "Excellent at following complex instructions", "Feels more human and less 'AI' in writing"],
    cons: ["Slightly lower message limits on paid plan vs competitors", "No native image generation"],
    logo: SiAnthropic
  },
  {
    id: "jasper",
    name: "Jasper",
    slug: "jasper",
    tagline: "Enterprise AI copilot for marketing teams.",
    description: "Built specifically for business and marketing content, Jasper aligns with brand voice and integrates with existing workflows.",
    category: "Writing",
    pricing: { model: "Paid", priceString: "From $39/mo" },
    affiliateUrl: "/go/jasper",
    website: "https://jasper.ai",
    rating: 4.5,
    features: ["Brand voice matching", "Marketing templates", "Campaign management", "SEO integration"],
    pros: ["Enterprise-grade security", "Team collaboration features", "Focused on marketing outcomes"],
    cons: ["Expensive for individuals", "Underlying models are available cheaper elsewhere"]
  },
  {
    id: "midjourney",
    name: "Midjourney",
    slug: "midjourney",
    tagline: "Stunningly artistic image generation.",
    description: "The premier AI image generator for high-quality, artistic, and photorealistic outputs. Accessible via Discord or their web interface.",
    category: "Image Generation",
    pricing: { model: "Paid", priceString: "From $10/mo" },
    affiliateUrl: "/go/midjourney",
    website: "https://midjourney.com",
    rating: 4.9,
    features: ["V6 model photorealism", "Style reference", "Character reference", "Inpainting"],
    pros: ["Unmatched artistic quality", "Highly steerable with parameters", "Strong community"],
    cons: ["Requires Discord for full feature set", "Steep learning curve for prompting"]
  },
  {
    id: "dalle3",
    name: "DALL-E 3",
    slug: "dalle3",
    tagline: "Prompt-following precision image generation.",
    description: "OpenAI's image generator built directly into ChatGPT, known for exceptional prompt adherence and text rendering.",
    category: "Image Generation",
    pricing: { model: "Paid", priceString: "Included with ChatGPT Plus" },
    affiliateUrl: "/go/dalle3",
    website: "https://openai.com/dall-e-3",
    rating: 4.6,
    features: ["Perfect prompt adherence", "Text rendering in images", "Conversational refinement", "API access"],
    pros: ["Easiest to use (conversational)", "Can spell text accurately", "Included in existing ChatGPT sub"],
    cons: ["Less artistic than Midjourney", "Aggressive safety filters", "Fixed aspect ratios"]
  },
  {
    id: "runway",
    name: "Runway",
    slug: "runway",
    tagline: "The full-stack applied AI platform for video.",
    description: "Pioneers in generative video with Gen-2 and Gen-3 Alpha, offering robust tools for video-to-video, text-to-video, and professional editing.",
    category: "Video",
    pricing: { model: "Freemium", priceString: "From $15/mo" },
    affiliateUrl: "/go/runway",
    website: "https://runwayml.com",
    rating: 4.7,
    features: ["Gen-3 Alpha model", "Motion brush", "Camera control", "Inpainting/Rotoscoping"],
    pros: ["Industry leading video generation", "Granular control over motion", "Web-based professional editor"],
    cons: ["High credit consumption", "Generations can sometimes morph unexpectedly"]
  },
  {
    id: "surferseo",
    name: "Surfer SEO",
    slug: "surferseo",
    tagline: "Data-driven SEO content optimization.",
    description: "Analyzes top-ranking pages to provide actionable guidelines on word count, NLP terms, and structure for ranking higher.",
    category: "SEO",
    pricing: { model: "Paid", priceString: "From $89/mo" },
    affiliateUrl: "/go/surferseo",
    website: "https://surferseo.com",
    rating: 4.8,
    features: ["Content editor", "SERP analyzer", "Keyword research", "AI article generation"],
    pros: ["Takes the guesswork out of on-page SEO", "Excellent content editor UI", "Integrates with Google Docs/Wordpress"],
    cons: ["Can encourage over-optimization", "Expensive entry point"]
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    slug: "github-copilot",
    tagline: "Your AI pair programmer.",
    description: "The standard for AI coding assistants. Integrates directly into your IDE to suggest code snippets, complete functions, and explain code.",
    category: "Coding",
    pricing: { model: "Paid", priceString: "$10/mo" },
    affiliateUrl: "/go/github-copilot",
    website: "https://github.com/features/copilot",
    rating: 4.6,
    features: ["Inline completions", "Chat interface", "PR description generation", "Enterprise security"],
    pros: ["Ubiquitous integration", "Fast and responsive", "Backed by massive GitHub dataset"],
    cons: ["Context window can feel small compared to newer tools", "Chat interface is sometimes clunky"],
    logo: SiGithub
  },
  {
    id: "cursor",
    name: "Cursor",
    slug: "cursor",
    tagline: "The AI-first code editor.",
    description: "A fork of VS Code built from the ground up for AI integration. Features Claude 3.5 Sonnet and a revolutionary 'Composer' feature.",
    category: "Coding",
    pricing: { model: "Freemium", priceString: "$20/mo for Pro" },
    affiliateUrl: "/go/cursor",
    website: "https://cursor.sh",
    rating: 4.9,
    features: ["Composer (multi-file editing)", "Codebase-wide context", "Claude 3.5 Sonnet integration", "Familiar VS Code UI"],
    pros: ["Best-in-class multi-file reasoning", "Feels magical to use", "Seamless transition from VS Code"],
    cons: ["Have to switch editors if not using VS Code", "Indexing large codebases can be slow"]
  },
  {
    id: "replit",
    name: "Replit",
    slug: "replit",
    tagline: "Collaborative browser-based IDE with built-in AI.",
    description: "Code anywhere with an environment that spins up instantly. Features Replit AI for generating, explaining, and debugging code.",
    category: "Coding",
    pricing: { model: "Freemium", priceString: "$20/mo for Core" },
    affiliateUrl: "/go/replit",
    website: "https://replit.com",
    rating: 4.7,
    features: ["Zero-setup environments", "Replit AI agent", "Real-time collaboration", "Deploy instantly"],
    pros: ["No environment configuration needed", "Great for rapid prototyping", "Agentic capabilities"],
    cons: ["Browser-based IDE isn't for everyone", "Resource limits on lower tiers"],
    logo: SiReplit
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    slug: "notion-ai",
    tagline: "AI integrated into your workspace.",
    description: "Write, edit, summarize, and extract insights from your Notion workspace without context switching.",
    category: "Productivity",
    pricing: { model: "Paid", priceString: "$10/mo add-on" },
    affiliateUrl: "/go/notion-ai",
    website: "https://notion.so/product/ai",
    rating: 4.5,
    features: ["Q&A across workspace", "Content generation", "Table autofill", "Translation"],
    pros: ["Zero friction if already using Notion", "Excellent at summarizing meeting notes", "Workspace-aware answers"],
    cons: ["Requires Notion lock-in", "Not as powerful as standalone LLMs for complex tasks"],
    logo: SiNotion
  },
  {
    id: "zapier",
    name: "Zapier AI",
    slug: "zapier",
    tagline: "Automate workflows with AI logic.",
    description: "Add AI steps to your automations to parse text, route emails, extract structured data, and make decisions.",
    category: "Productivity",
    pricing: { model: "Freemium", priceString: "From $20/mo" },
    affiliateUrl: "/go/zapier",
    website: "https://zapier.com",
    rating: 4.6,
    features: ["AI routing", "Data extraction", "Chatbot builder", "Centralbots"],
    pros: ["Connects with 6000+ apps", "No-code AI implementation", "Extremely reliable"],
    cons: ["Can get expensive quickly at scale", "Steep learning curve for complex Zaps"],
    logo: SiZapier
  },
  {
    id: "make",
    name: "Make",
    slug: "make",
    tagline: "Visual workflow automation platform.",
    description: "A more visual, flexible alternative to Zapier that integrates seamlessly with AI APIs for complex, branching automations.",
    category: "Productivity",
    pricing: { model: "Freemium", priceString: "From $10.59/mo" },
    affiliateUrl: "/go/make",
    website: "https://make.com",
    rating: 4.8,
    features: ["Visual workflow builder", "Native OpenAI/Anthropic modules", "Branching logic", "Error handlers"],
    pros: ["Significantly cheaper than Zapier", "Visual interface is intuitive for complex logic", "Unlimited steps on all plans"],
    cons: ["UI can be overwhelming at first", "Less app integrations than Zapier"],
    logo: SiMake
  }
];

export const getFeaturedTools = () => {
  return tools.filter(t => ["cursor", "claude", "midjourney", "runway", "surferseo", "make", "replit", "chatgpt"].includes(t.id));
};

export const getNewAndNotable = () => {
  return tools.filter(t => ["cursor", "runway", "claude"].includes(t.id));
};

export const getToolsByCategory = (category: string) => {
  return tools.filter(t => t.category.toLowerCase() === category.toLowerCase());
};

export const getCategories = () => {
  const cats = new Set(tools.map(t => t.category));
  return Array.from(cats);
};

export const getToolBySlug = (slug: string) => {
  return tools.find(t => t.slug === slug);
};
