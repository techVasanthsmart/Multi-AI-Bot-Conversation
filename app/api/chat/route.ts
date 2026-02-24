import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { history, nextSpeaker, model, provider, systemPrompt } = body;

    let apiKey = '';
    let baseURL = undefined;

    switch (provider) {
      case 'OpenAI':
        apiKey = process.env.OPENAI_API_KEY || '';
        break;
      case 'Google':
        apiKey = process.env.GEMINI_API_KEY || '';
        baseURL = 'https://generativelanguage.googleapis.com/v1beta/openai/';
        break;
      case 'OpenRouter':
        apiKey = process.env.OPENROUTER_API_KEY || '';
        baseURL = 'https://openrouter.ai/api/v1';
        break;
      case 'Groq':
        apiKey = process.env.GROQ_API_KEY || '';
        baseURL = 'https://api.groq.com/openai/v1';
        break;
      case 'Z.AI':
        apiKey = process.env.GLM_API_KEY || '';
        baseURL = 'https://api.z.ai/api/paas/v4';
        break;
      default:
        break;
    }

    if (!apiKey) {
      return NextResponse.json({
        content: `[BackEnd Mock] No API Key configured for ${provider}! Please check your .env file.`,
        sender: nextSpeaker
      });
    }

    const openai = new OpenAI({
      apiKey,
      baseURL,
    });

    const formattedConvo = history
      .map((msg: any) => {
        const sender = msg.senderName || (msg.role === 'user' ? 'User' : 'Assistant');
        return `${sender}: ${msg.content}`;
      })
      .join('\n');

    const userPrompt = `You are ${nextSpeaker}.\nContinue the conversation with ONE new line from ${nextSpeaker} only.\n\nRules:\n- Stay in character.\n- 1-2 sentences max.\n- React to the previous messages.\n\nConversation History:\n${formattedConvo}\n\nNow write ${nextSpeaker}'s next line:`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ] as any;

    const response = await openai.chat.completions.create({
      model: model,
      messages: messages,
      ...(provider === 'Z.AI' && { thinking: { type: 'enabled' }, max_tokens: 4096, temperature: 1.0 })
    } as any);

    let content = response.choices[0].message.content?.trim() || '';

    // Clean up if the model outputs "Speaker: Content"
    if (content.startsWith(`${nextSpeaker}:`)) {
      content = content.substring(nextSpeaker.length + 1).trim();
    }

    return NextResponse.json({
      content,
      sender: nextSpeaker,
    });
  } catch (error: any) {
    console.error('Chat Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
