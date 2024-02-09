"use server";

import OpenAI from "openai";
import { ChatCompletion as ChatCompletionResponse } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export const ChatCompletion = async (
  prompt: string
): Promise<ChatCompletionResponse> => {
  return await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo-0125",
  });
};
