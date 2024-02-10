"use server";

import OpenAI from "openai";
import { ChatCompletion as ChatCompletionResponse } from "openai/resources";
import { createSBClient } from "../supabase/userHelper";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export const chatCompletion = async (
  prompt: string
): Promise<ChatCompletionResponse> => {
  console.log("here");
  return await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo-0125",
  });
};

export const uploadChatResponse = async (
  userId: string,
  prompt: string,
  response: string
) => {
  const client = createSBClient();
  const { data, error } = await client
    .from("chat_response")
    .upsert({ user_id: userId, prompt, response });
};

export const getChatResponses = async (userId: string) => {
  const client = createSBClient();
  const { data, error } = await client
    .from("chat_response")
    .select()
    .eq("user_id", userId);
  return data;
};
