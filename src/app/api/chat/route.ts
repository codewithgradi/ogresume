import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req: Request) {
  try {
    if (!genAI) {
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const { userData } = await req.json();
    const userDataString = JSON.stringify(userData, null, 2);

    // List of models to try in order of preference for 2026
    const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash-latest"];
    let text = "";
    let lastError = "";

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: "v1" });
        const prompt = `
        Review this South African tech CV data:
        ${userDataString}. 
        Provide strong/weak points, 2 projects, and a 3-month roadmap.
        Your response should be cleanly styles with bullet points and make sub titles bold.
        Your response is limited to 400 Words.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();
        
        if (text) break; // Success! Exit the loop.
      } catch (err: any) {
        lastError = err.message;
        console.warn(`Failed with ${modelName}, trying next...`);
        continue;
      }
    }

    if (!text) {
      throw new Error(`All models failed. Last error: ${lastError}`);
    }

    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify({ text }));

    return new NextResponse(encodedData, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": encodedData.length.toString(),
      },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";

    console.error("Gemini Route Error:", errorMessage);
    return NextResponse.json(
      { error: error || "Failed to generate feedback" },
      { status: 500 }
    );
  }
}