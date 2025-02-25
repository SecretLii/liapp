import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";
import { getServerEnv } from '@/lib/env';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Initialize Tavily and OpenAI
const tavily = new TavilySearchResults({ 
  apiKey: getServerEnv('TAVILY_API_KEY')
});

const openai = new ChatOpenAI({
  openAIApiKey: getServerEnv('OPENAI_API_KEY'),
  modelName: "gpt-4",
  temperature: 0.7
});

export async function POST(req: Request) {
  try {
    const { title, description, gameId } = await req.json();

    if (!title || !description || !gameId) {
      return NextResponse.json(
        { error: "Title, description, and gameId are required." },
        { status: 400 }
      );
    }

    // Verify game exists
    const game = await prisma.game.findUnique({
      where: { id: gameId }
    });

    if (!game) {
      return NextResponse.json(
        { error: "Game not found" },
        { status: 404 }
      );
    }

    // Step 1: Generate search queries based on title and description
    const searchQueriesPrompt = `Generate 5 relevant search queries based on this game guide topic: "${title} - ${description}". 
    Focus on gameplay mechanics, strategies, and tips.`;
    
    const searchTermsResponse = await openai.invoke(searchQueriesPrompt);
    const searchTerms = searchTermsResponse.content.split("\n").filter(Boolean);

    // Step 2: Fetch search results using Tavily
    const searchResults = await Promise.all(
      searchTerms.map(async (query) => {
        return await tavily.call(query);
      })
    );

    // Step 3: Generate the final guide using OpenAI
    const guidePrompt = `You are an expert game guide writer. Based on the following information:

Title: "${title}"
Description: "${description}"
Research Results: ${JSON.stringify(searchResults)}

Generate a comprehensive game guide that includes:
1. Introduction
2. Key mechanics and systems
3. Basic strategies and tips
4. Advanced techniques
5. Common mistakes to avoid
6. Conclusion

Format the guide in Markdown with clear sections and bullet points where appropriate.
Make it engaging and easy to follow.`;

    const finalGuideResponse = await openai.invoke(guidePrompt);
    const guideContent = finalGuideResponse.content;

    // Step 4: Save the guide to the database
    const guide = await prisma.guide.create({
      data: {
        title,
        content: guideContent,
        gameId
      }
    });

    // Step 5: Update the game's guide count
    await prisma.game.update({
      where: { id: gameId },
      data: { guideCount: { increment: 1 } }
    });

    // Step 6: Revalidate the guides page
    revalidatePath('/guides');
    revalidatePath(`/games/${game.slug}`);

    return NextResponse.json({ 
      success: true,
      guide: {
        id: guide.id,
        title: guide.title,
        content: guideContent
      },
      metadata: {
        searchQueries: searchTerms,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error("Error generating guide:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate guide",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
} 