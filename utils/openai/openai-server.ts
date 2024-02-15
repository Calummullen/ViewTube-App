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
  const apiResponse = await client
    .from("chat_response")
    .upsert({ user_id: userId, prompt, response });
  return apiResponse;
};

export const getChatResponses = async (userId: string) => {
  const client = createSBClient();
  const { data, error } = await client
    .from("chat_response")
    .select()
    .eq("user_id", userId);
  return data;
};

export const deleteChatResponses = async (userIds: string[]) => {
  const client = createSBClient();

  const response = await Promise.all(
    userIds.map(
      async (id) =>
        await client
          .from("chat_response")
          .delete({ count: "exact" })
          .eq("id", id)
    )
  );

  //   const response = await client
  //     .from("chat_response")
  //     .delete({ count: "exact" })
  //     .eq("id", userIds);
  return response;
};

export const testImageGeneration = async (prompt: string) => {
  return await openai.images.generate({
    model: "dall-e-3",
    prompt,
    size: "1024x1024",
    quality: "standard",
  });
};
