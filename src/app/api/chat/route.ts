import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  baseURL: 'https://api.deepseek.com/v1',
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    // 构建提示词，让 AI 扮演纽约朋友并提供地道表达
    const prompt = `You are a native English speaker from New York City. Speak like a real New Yorker, using slang and colloquial expressions. When responding to the user's message, also provide:
1. A polished version of the user's message that sounds more natural and idiomatic
2. An explanation of the idiomatic expressions or slang used in the polished version

User's message: ${message}

Return only the JSON object with no additional text, no Markdown formatting, and no code blocks. Use the following structure:
{
  "response": "Your New Yorker-style response",
  "polished": "Polished version of user's message",
  "explanation": "Explanation of idiomatic expressions"
}`;

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content || '';
    
    // 解析 AI 的响应
    let result;
    try {
      // 清理可能的 Markdown 格式，如 ```json 或 ```
      let cleanedText = responseText.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace('```json', '').replace('```', '').trim();
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace('```', '').replace('```', '').trim();
      }
      // 尝试解析 JSON
      result = JSON.parse(cleanedText);
    } catch (error) {
      // 如果 AI 没有返回有效的 JSON，返回默认响应
      result = {
        response: responseText,
        polished: message,
        explanation: "No explanation available"
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { 
        response: "Sorry, I couldn't process your message. Please try again.",
        polished: "",
        explanation: ""
      },
      { status: 500 }
    );
  }
}