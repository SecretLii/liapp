import { ChatOpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { DynamicTool } from "@langchain/core/tools";
import { prisma } from '@/lib/prisma'
import { getServerEnv } from '@/lib/env'

// Tool to search the database for games
const searchGamesTool = new DynamicTool({
  name: "search_games",
  description: "Search for games in the database",
  func: async (query: string) => {
    const games = await prisma.game.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } }
        ]
      },
      take: 5,
      select: {
        title: true,
        description: true,
        guideCount: true
      }
    });
    return JSON.stringify(games);
  },
});

// Tool to search for guides
const searchGuidesTool = new DynamicTool({
  name: "search_guides",
  description: "Search for game guides in the database",
  func: async (query: string) => {
    const guides = await prisma.guide.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { content: { contains: query } },
          { game: { title: { contains: query } } }
        ]
      },
      include: {
        game: {
          select: {
            title: true
          }
        }
      },
      take: 5
    });
    return JSON.stringify(guides);
  },
});

// Initialize the agent executor
export async function createAgent() {
  try {
    const model = new ChatOpenAI({
      temperature: 0.7,
      modelName: "gpt-3.5-turbo",
      openAIApiKey: getServerEnv('OPENAI_API_KEY'),
    });

    const tools = [searchGamesTool, searchGuidesTool];

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "chat-conversational-react-description",
      verbose: true,
      maxIterations: 3,
    });

    return executor;
  } catch (error) {
    console.error("Error creating agent:", error);
    throw error;
  }
}

// Function to run the agent
export async function runAgent(query: string) {
  try {
    const agent = await createAgent();
    const result = await agent.invoke({
      input: query,
    });

    return {
      response: result.output,
      success: true
    };
  } catch (error) {
    console.error("Agent execution error:", error);
    return {
      response: "I encountered an error while processing your request. Please try again.",
      success: false
    };
  }
} 