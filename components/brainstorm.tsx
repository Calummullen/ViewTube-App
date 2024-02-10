"use client";

import { FC, useEffect, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  chatCompletion,
  uploadChatResponse,
  getChatResponses,
} from "@/utils/openai/openai-server";
import { useTypewriter, Typewriter } from "react-simple-typewriter";
import { useApp } from "@/utils/context/app.context";

interface Input {
  prompt: string;
}

interface ResponseHistory {
  createdAt: Date;
  id?: string;
  prompt: string;
  response: string;
  userId?: string;
}

const Brainstorm: FC = () => {
  const { user } = useApp();
  const [chatResponse, setChatResponse] = useState<string[]>([]);
  const [responseHistory, setResponseHistory] = useState<ResponseHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, getValues } = useForm<Input>();

  const getResponseHistory = async () => {
    const test = await getChatResponses(user.id);
    const result = test?.map((key) => {
      return {
        prompt: key.prompt,
        response: key.response,
        createdAt: key.created_at,
      };
    });
    if (result?.length) setResponseHistory(result);
  };

  useEffect(() => {
    // const getResponseHistory = async () => {
    //   const test = await getChatResponses(user.id);
    //   const result = test?.map((key) => {
    //     return {
    //       prompt: key.prompt,
    //       response: key.response,
    //       createdAt: key.created_at,
    //     };
    //   });
    //   if (result?.length) setResponseHistory(result);
    // };
    console.log("rerender", chatResponse);
    getResponseHistory();
  }, []);

  const onSubmit: SubmitHandler<Input> = async (data: Input) => {
    setChatResponse([]);
    const promptResponse = await chatCompletion(data.prompt);
    setChatResponse([promptResponse.choices[0].message.content || ""]);
  };

  const onSaveResponse = async () => {
    const prompt = getValues("prompt");
    await uploadChatResponse(user.id, prompt, chatResponse[0]);
    await getResponseHistory();
  };

  return (
    <div className="md:my-4 lg:mx-16 animate-in flex flex-col gap-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-base-300 border rounded-lg p-4 w-full"
      >
        <label className="text-lg" htmlFor="prompt">
          Enter prompt
        </label>
        <div className="flex flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered grow"
            {...register("prompt")}
          />
          <button type="submit">
            <SendHorizonal size={32} />
          </button>
        </div>

        <div>
          <p className="text-lg">Response:</p>
          {chatResponse.length ? (
            <>
              <Typewriter words={chatResponse} typeSpeed={10} />
              <p className="text-sm mt-4">
                Click{" "}
                <a
                  onClick={onSaveResponse}
                  className="underline cursor-pointer"
                >
                  here
                </a>{" "}
                to save this response
              </p>
            </>
          ) : (
            <div />
          )}
        </div>
      </form>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>User Prompt</th>
                <th>Response</th>
                <th>Date Requested</th>
              </tr>
            </thead>
            <tbody>
              {responseHistory.map((item, index) => (
                <tr key={item.prompt}>
                  <th>{index + 1}</th>
                  <td>{item.prompt}</td>
                  <td>{item.response}</td>
                  <td>{item.createdAt.toString()}</td>
                </tr>
              ))}
              {/* row 2 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Brainstorm;
