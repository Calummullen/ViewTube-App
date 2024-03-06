"use client";

import { useApp } from "@/utils/context/app.context";
import {
  chatCompletion,
  deleteChatResponses,
  getChatResponses,
  testImageGeneration,
  uploadChatResponse,
} from "@/utils/openai/openai-server";
import { format } from "date-fns";
import { SendHorizonal } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Typewriter } from "react-simple-typewriter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Input {
  prompt?: string;
  imagePrompt?: string;
}

interface ResponseHistory {
  createdAt: Date;
  id: string;
  prompt: string;
  response: string;
  userId?: string;
  markedForDeletion?: boolean;
}

const Brainstorm: FC = () => {
  const { user } = useApp();
  const [chatResponse, setChatResponse] = useState<string[]>([]);
  const [responseHistory, setResponseHistory] = useState<ResponseHistory[]>([]);
  const [showDeleteColumn, setShowDeleteColumn] = useState<boolean>(false);
  const [testImage, setImage] = useState<string>();
  const [rowsMarkedForDeletion, setRowsMarkedForDeletion] = useState<string[]>(
    []
  );
  const { isLoading, setIsLoading } = useApp();

  const { register, handleSubmit, getValues } = useForm<Input>();

  const testImageG = async (data: Input) => {
    console.log("hi");
    if (data.imagePrompt) {
      setIsLoading(true);
      const result = await testImageGeneration(data.imagePrompt);
      const image = result.data[0].url;
      setImage(image);
      setIsLoading(false);
    }
  };

  const getResponseHistory = async () => {
    const test = await getChatResponses(user.id);
    const result = test?.map((key) => {
      return {
        id: key.id,
        prompt: key.prompt,
        response: key.response,
        createdAt: key.created_at,
      };
    });
    if (result?.length) setResponseHistory(result);
  };

  const notify = () => toast("Wow so easy!");

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
    if (data.prompt) {
      const promptResponse = await chatCompletion(data.prompt);
      setChatResponse([promptResponse.choices[0].message.content || ""]);
    }
  };

  const onSaveResponse = async () => {
    const prompt = getValues("prompt");
    if (prompt) {
      const { data, error } = await uploadChatResponse(
        user.id,
        prompt,
        chatResponse[0]
      );

      if (!error) {
        toast(`Successfully added new response record.`, {
          type: "success",
        });
        await getResponseHistory();
      }
    }
  };

  const deleteRows = async () => {
    if (rowsMarkedForDeletion.length === 0) return;
    console.log(rowsMarkedForDeletion);
    const response = await deleteChatResponses(rowsMarkedForDeletion);

    if (!response.some((r) => r.error)) {
      toast(`Deleted ${response.length} records.`, {
        type: "success",
      });
      await getResponseHistory();
      setRowsMarkedForDeletion([]);
    }
  };

  return (
    <div className="md:my-4 lg:mx-16 animate-in flex flex-col gap-4">
      <div>
        <form onSubmit={handleSubmit(testImageG)}>
          <label className="text-lg" htmlFor="imagePrompt">
            Enter Image Idea
          </label>
          <div className="flex flex-row gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered grow"
              {...register("imagePrompt")}
            />
          </div>
        </form>
        {isLoading ? "Generating image" : testImage && <img src={testImage} />}
      </div>
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
              <tr className="">
                <th></th>
                <th>User Prompt</th>
                <th>Response</th>
                <th>Date Requested</th>

                <th className="w-[175px]">
                  <button
                    disabled={rowsMarkedForDeletion.length === 0}
                    className="btn btn-outline btn-error btn-sm w-full"
                    onClick={deleteRows}
                  >
                    Delete {rowsMarkedForDeletion.length} row
                    {rowsMarkedForDeletion.length > 1 ||
                    rowsMarkedForDeletion.length === 0
                      ? "s"
                      : ""}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {responseHistory.map((item, index) => (
                <tr key={`${item.prompt}${index}`} className="">
                  <th>{index + 1}</th>
                  <td>{item.prompt}</td>
                  <td>{item.response}</td>
                  <td>{format(item.createdAt, "dd/MM/yyyy kk:mm:ss")}</td>
                  {!showDeleteColumn ? (
                    <td className="flex-col justify-center items-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-error ml-14"
                        onChange={(e) => {
                          e.target.checked
                            ? setRowsMarkedForDeletion([
                                ...rowsMarkedForDeletion,
                                item.id,
                              ])
                            : setRowsMarkedForDeletion((state) =>
                                state.filter((i) => i !== item.id)
                              );
                        }}
                      />
                    </td>
                  ) : (
                    ""
                  )}
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
