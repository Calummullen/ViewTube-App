"use client";

import { useApp } from "@/utils/context/app.context";
import { authenticateYoutubeAccount } from "@/utils/youtube/youtube-server";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import LoadingSpinner from "./loading-spinner";

interface Input {
  isYoutubeAccountConnected: boolean;
}

const Welcome: FC = () => {
  const { user, setUser, isLoading, setIsLoading } = useApp();
  const router = useRouter();

  const authenticate = async () => {
    await authenticateYoutubeAccount();
    // await markAccountAsYoutubeAuthenticated();
    // setUser({
    //   ...user,
    //   user_metadata: {
    //     isYoutubeAccountConnected: true,
    //   },
    // });
  };

  const onSubmit = async (data: Input) => {
    setIsLoading(true);

    // if (result.data.user?.user_metadata.isYoutubeAccountConnected) {
    //   return router.push("/");
    // }
    setIsLoading(false);
  };

  return (
    <div className="mx-8 md:mx-24 animate-fade animate-once animate-duration-[2000ms] animate-ease-in flex h-screen">
      {isLoading ? (
        <LoadingSpinner isFullscreen />
      ) : (
        <div className="flex flex-col gap-12 text-center items-center my-16 md:m-auto">
          <h2 className="font-bold text-7xl md:text-9xl  animate-fade-right animate-delay-[1000ms]">
            Welcome to View<span className="text-red-500">Tube</span>
          </h2>
          <h3 className="text-4xl  animate-fade-right animate-delay-[2500ms]">
            Your Personal YouTube Growth Partner!
          </h3>
          <p className="text-2xl md:mx-36  animate-fade-right animate-delay-[4000ms]">
            To proceed, please connect your YouTube account by clicking the
            button below. You will be redirected to a Google authentication page
            where ViewTube will request permission to access data essential for
            your dashboard, including your handle, viewer count, and subscriber
            count.
          </p>

          <button
            onClick={authenticate}
            className="btn btn-lg w-full md:w-fit flex flex-row gap-4  animate-fade-right animate-delay-[4000ms]"
          >
            <Image
              width={28}
              height={28}
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google logo button"
            />
            <span>Connect with Google</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Welcome;
