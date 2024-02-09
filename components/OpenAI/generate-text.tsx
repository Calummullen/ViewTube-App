import { useState } from "react";
import OpenAI from "openai";
import { ChatCompletion } from "@/utils/openai/openai-server";

const Generate = (prompt: string) => {
  const [text, setText] = useState("");
  const generateText = async () => {
    const prompt = "Once upon a time";
    const chatCompletion = await ChatCompletion(prompt);
    console.log(chatCompletion);
  };
  return (
    <div>
      <button onClick={generateText}>Generate Text</button>
      <p>{text}</p>
    </div>
  );
};

export default Generate;
