"use client";

import { FC, useEffect, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChatCompletion } from "@/utils/openai/openai-server";
import { useTypewriter, Typewriter } from "react-simple-typewriter";

interface Input {
  prompt: string;
}

const Brainstorm: FC = () => {
  const [chatResponse, setChatResponse] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid, isDirty },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data: Input) => {
    setChatResponse([]);
    const promptResponse = await ChatCompletion(data.prompt);
    setChatResponse([promptResponse.choices[0].message.content || ""]);
    console.log(promptResponse);
  };

  return (
    <div className="md:my-4 lg:mx-16 animate-in">
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
                <a onClick={() => {}} className="underline cursor-pointer">
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
    </div>
  );
};

export default Brainstorm;
