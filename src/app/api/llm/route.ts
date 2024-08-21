import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { text, prompt, apiKey, model } = await request.json();
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
  const formattedPrompt = `
    You are a helpful educational AI assistant. Please respond to the following prompt:
    ${prompt}

    Here's the relevant text:
    ${text}
  `;
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: formattedPrompt }],
      max_tokens: 500,
    });
    let content = response.choices[0].message?.content || "No response";
    const lastSentenceEnd = Math.max(
      content.lastIndexOf("."),
      content.lastIndexOf("!"),
      content.lastIndexOf("?"),
    );
    if (lastSentenceEnd !== -1) {
      content = content.substring(0, lastSentenceEnd + 1);
    }
    return NextResponse.json({ message: content }, { status: 200 });
  } catch (error) {
    console.error("Error fetching response:", error);
    return NextResponse.json(
      {
        message:
          "An error occurred while fetching the response. Please check the api key and try again by refreshing the page.",
      },
      { status: 500 },
    );
  }
}
