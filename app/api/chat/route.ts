import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { history, nextSpeaker, model, provider, systemPrompt } = body;
    const requestedModel = typeof model === "string" ? model.trim() : "";

    let apiKey = "";
    let baseURL = undefined;
    let defaultHeaders: Record<string, string> | undefined;

    switch (provider) {
      case "OpenAI":
        apiKey = process.env.OPENAI_API_KEY || "";
        break;
      case "Google":
        apiKey = process.env.GEMINI_API_KEY || "";
        baseURL = "https://generativelanguage.googleapis.com/v1beta/openai/";
        break;
      case "OpenRouter":
        apiKey = process.env.OPENROUTER_API_KEY || "";
        baseURL = "https://openrouter.ai/api/v1";
        break;
      case "Groq":
        apiKey = process.env.GROQ_API_KEY || "";
        baseURL = "https://api.groq.com/openai/v1";
        break;
      case "Z.AI":
        apiKey = process.env.ZAI_API_KEY || process.env.GLM_API_KEY || "";
        baseURL = "https://api.z.ai/api/paas/v4";
        defaultHeaders = { "Accept-Language": "en-US,en" };
        break;
      default:
        break;
    }

    const resolvedModel =
      provider === "Z.AI"
        ? requestedModel ||
          process.env.ZAI_MODEL ||
          process.env.GLM_MODEL ||
          "glm-5"
        : requestedModel;

    if (!apiKey) {
      return NextResponse.json({
        content: `[BackEnd Mock] No API Key configured for ${provider}! Please check your .env file.`,
        sender: nextSpeaker,
      });
    }

    const openai = new OpenAI({
      apiKey,
      baseURL,
      defaultHeaders,
    });

    const formattedConvo = history
      .map((msg: any) => {
        const sender =
          msg.senderName || (msg.role === "user" ? "User" : "Assistant");
        return `${sender}: ${msg.content}`;
      })
      .join("\n");

    const userPrompt = `You are ${nextSpeaker}.\nContinue the conversation with ONE new line from ${nextSpeaker} only.\n\nRules:\n- Stay in character.\n- 1-2 sentences max.\n- React to the previous messages.\n\nConversation History:\n${formattedConvo}\n\nNow write ${nextSpeaker}'s next line:`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ] as any;

    const stream = await openai.chat.completions.create({
      model: resolvedModel,
      messages: messages,
      stream: true,
      ...(provider === "Z.AI" && {
        thinking: { type: "enabled" },
        max_tokens: 4096,
        temperature: 1.0,
      }),
    } as any);

    let content = "";

    for await (const chunk of stream as any) {
      const delta = chunk?.choices?.[0]?.delta?.content;
      if (typeof delta === "string") {
        content += delta;
      }
    }

    content = content.trim();

    // Clean up if the model outputs "Speaker: Content"
    if (content.startsWith(`${nextSpeaker}:`)) {
      content = content.substring(nextSpeaker.length + 1).trim();
    }

    return NextResponse.json({
      content,
      sender: nextSpeaker,
    });
  } catch (error: any) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
