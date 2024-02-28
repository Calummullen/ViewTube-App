"use client";

import { addYoutubeHandleToUser } from "@/app/actions";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import LoadingSpinner from "./loading-spinner";
import { useApp } from "@/utils/context/app.context";

interface Input {
  youtubeHandle: string;
}

const Welcome: FC = () => {
  const { register, handleSubmit, getValues } = useForm<Input>();
  const { user, setUser } = useApp();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: Input) => {
    setIsLoading(true);
    const result = await addYoutubeHandleToUser(data.youtubeHandle);
    setUser({ ...user, user_metadata: { youtubeHandle: data.youtubeHandle } });
    if (result.data.user?.user_metadata.youtubeHandle) {
      return router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="mx-8 md:mx-24 animate-fade animate-once animate-duration-[2000ms] animate-ease-in flex h-screen">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-8 text-center items-center my-16 md:m-auto">
          <h2 className="font-bold text-7xl md:text-9xl  animate-fade animate-delay-[1000ms]">
            Welcome to View<span className="text-red-500">Tube</span>
          </h2>
          <h3 className="text-4xl  animate-fade animate-delay-[2500ms]">
            More content
          </h3>
          <p className="text-2xl md:mx-36  animate-fade animate-delay-[4000ms]">
            To continue, please enter your YouTube handle in the input below.
            This is required to correctly display your dashboard. No need to
            enter the @ symbol, this will be added automatically.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center  animate-fade animate-delay-[5500ms]"
          >
            <label className="text-lg" htmlFor="youtubeHandle" />
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full md:w-[500px] h-[75px] mb-6"
              {...register("youtubeHandle")}
            />
            <button
              className="btn btn-success w-full md:w-[250px]"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Welcome;
