"use client";

import { FC, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChatCompletion } from "@/utils/openai/openai-server";
import { Typewriter } from "react-simple-typewriter";

interface Input {
  prompt: string;
}

const Brainstorm: FC = () => {
  const [chatResponse, setChatResponse] = useState<string>("");

  const onSubmit: SubmitHandler<Input> = async (data: Input) => {
    const promptResponse = await ChatCompletion(data.prompt);
    setChatResponse(promptResponse.choices[0].message.content || "");
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<Input>();
  return (
    <div className="md:my-4 lg:mx-16 animate-in">
      <div className="flex flex-col gap-4 bg-base-300 border rounded-lg p-4 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
        {chatResponse && (
          <div>
            <p className="text-lg">Response:</p>
            <Typewriter words={[chatResponse]} typeSpeed={10} />
            <p className="text-sm mt-4">
              Click{" "}
              <a onClick={() => {}} className="underline">
                here
              </a>{" "}
              to save this response
            </p>
            {/* <p className="">{chatResponse}</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Brainstorm;
