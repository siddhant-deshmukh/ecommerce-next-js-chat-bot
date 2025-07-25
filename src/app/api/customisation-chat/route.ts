import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import CustomChat from '@/models/CustomChat';
import { checkRateLimit } from '@/lib/checkRateLimit';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '10');
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW || '15') * 60 * 1000;

const API_KEY = process.env.GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export async function POST(req: NextRequest) {
  const ipHeader = req.headers.get('x-forwarded-for');
  const ip = ipHeader?.split(',')[0].trim() || 'unknown';
  
  await dbConnect.connect();

  const allowed = await checkRateLimit(ip, RATE_LIMIT_WINDOW, RATE_LIMIT_MAX);
  if (!allowed) {
    return NextResponse.json({ msg: 'Rate limit exceeded. Try again later.' }, { status: 429 });
  }

  const body = await req.json();
  const { chatId, product, messages, newMessage } = body;

  if (!product || !newMessage || !Array.isArray(messages)) {
    return NextResponse.json({ msg: 'Invalid request body.' }, { status: 400 });
  }

  const history = messages.map((msg: { role: string; content: string }) => ({
    role: msg.role === 'assistant' ? 'model' : msg.role,
    parts: [{ text: msg.content }],
  }));

const systemInstruction = {
  role: 'system',
  parts: [
    {
      text: `You are a helpful assistant for a jewellery e-commerce website. The user is customizing this product:\n\n${JSON.stringify(product, null, 2)}\n\n

Your job:
1. Respond in 1–4 clear, specific sentences.
2. Ask relevant follow-up questions to gather customization details.
3. Do NOT repeatedly ask for confirmation — assume intent from user messages.
4. Once the user provides all needed info, ask: "Please share your contact details. Our agents will call you soon."
5. When the user shares contact info, reply: "Thank you! We’ve received your details and will contact you shortly."

MANDATORY:
At the end of each reply (unless the user has given contact details), add 1–3 follow-up prompts inside this tag:
<suggested_inputs>["..."]</suggested_inputs>

Each suggestion must be:
- 20–120 characters
- Relevant to jewelry customization
- Written as natural questions or prompts

Example:
<suggested_inputs>["Make this in rose gold", "Make it in Start Shape", "Make it final"]</suggested_inputs>

NEVER explain the format. Only respond as if chatting with a customer.`
    }
  ]
};



  try {
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1200,
        temperature: 0.7,
      },

      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
      systemInstruction: systemInstruction,
    });

    const result = await chat.sendMessage(newMessage);
    const response = result.response;

    // if (response.candidates && response.candidates.length > 0) {
    //   const candidate = response.candidates[0];
    //   console.log('Candidate finishReason:', candidate.finishReason);
    //   console.log('Candidate safetyRatings:', JSON.stringify(candidate.safetyRatings, null, 2));
    //   console.log('Candidate functionCall:', JSON.stringify(candidate.functionCall, null, 2));
    //   console.log('Candidate content parts:', JSON.stringify(candidate.content.parts, null, 2));
    // } else {
    //   console.log('No candidates found in the response.');
    // }

    const fullReply = response.text();


    let mainReply = fullReply;
    let suggestedInputs: string[] = [];

    const regex = /<suggested_inputs>(.*?)<\/suggested_inputs>/s;
    const match = fullReply.match(regex);
    if (match && match[1]) {
      const jsonString = match[1].trim();
      mainReply = fullReply.replace(regex, '').trim();

      try {
        suggestedInputs = JSON.parse(jsonString);
        if (!Array.isArray(suggestedInputs) || !suggestedInputs.every(item => typeof item === 'string')) {
          console.warn('Parsed suggestions were not a valid array of strings. Resetting.');
          suggestedInputs = [];
        }
      } catch (e) {
        console.error('Failed to parse suggested inputs JSON:', e);
        suggestedInputs = [];
      }
    }

    let updatedChat;

    if (chatId && mongoose.Types.ObjectId.isValid(chatId)) {
      updatedChat = await CustomChat.findByIdAndUpdate(
        chatId,
        {
          $push: {
            messages: [
              { role: 'user', content: newMessage },
              { role: 'assistant', content: mainReply }
            ]
          }
        },
        { new: true }
      );
    } else {
      updatedChat = await CustomChat.create({
        messages: [
          { role: 'user', content: newMessage },
          { role: 'assistant', content: mainReply }
        ],
        ipAddress: ip
      });
    }

    return NextResponse.json({ mainReply, chatId: updatedChat._id, suggestedInputs });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ msg: 'Something went wrong' }, { status: 500 });
  }
}