"use client";

import { GetXVideosResponse } from "@/app/entities/youtube/youtube.types";
import { YoutubeService } from "@/app/services/youtube.service";
import { useApp } from "@/utils/context/app.context";
import {
  getSearchTerms,
  getYoutubes,
  getFirstXVideosForUser,
  getChannelIdViaHandle,
} from "@/utils/youtube/youtube-server";
import { FC, useEffect, useState } from "react";

// const youtubeService = new YoutubeService();

export const Dashboard: FC = () => {
  const { user } = useApp();
  const testMe = async () => {
    const test = await getYoutubes();
    // setMainVideoTitle(test.items[0].snippet.title);
    // setMainViews(test.items[0].snippet.publishedAt);
  };

  const testGetFirstXVideosForUser = async () => {
    setIsLoading(true);
    const response = await getFirstXVideosForUser(
      user.user_metadata.youtubeHandle
    );
    // setVideosResponse(test.items[0].snippet);
    console.log(response);
    setVideosResponse(response);
    setIsLoading(false);
  };

  useEffect(() => {
    testGetFirstXVideosForUser();
  }, []);

  const testMeKeywords = async () => {
    const test = await getSearchTerms("warzone");
  };
  // const TestRequest = async () => {
  //   const test = await youtubeService.getMostPopularVideos();
  //   console.log("fff", test);
  //   setMainVideoTitle(test.items[0].snippet.title);
  //   setMainViews(test.items[0].snippet.publishedAt);
  // };

  const [mainVideoTitle, setMainVideoTitle] = useState<string>();
  const [mainVideoViews, setMainViews] = useState<string>();
  const [videosResponse, setVideosResponse] = useState<GetXVideosResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="px-4 sm:p-8 flex flex-col gap-8">
      <div className="bg-base-300 shadow-lg">
        <h1 className="text-primary">Calum Mullen</h1>
        <button className="bg-base-300">Test123</button>
        {/* <div className="flex-1">
      <img alt="OM" className="btn btn-ghost p-0" />
      <h1 className="text-lg font-bold mx-4">Your Website</h1>
    </div> */}
        <div className="flex-none">
          <div className="">
            <p>Dashboard Page</p>
            {/* <button onClick={testMe}>Click Me (Videos)</button>
            {mainVideoTitle && <p>{mainVideoTitle}</p>}
            {mainVideoViews && (
              <p>{new Date(mainVideoViews).toLocaleString()}</p>
            )}
            <button onClick={testMeKeywords}>Click Me (Keywords)</button> */}
            {/* <button onClick={testGetFirstXVideosForUser}>
              Click Me (Get X Videos)
            </button> */}
          </div>

          {/* <button className="btn btn-square btn-ghost">
      <label className="swap swap-rotate w-12 h-12">
        <input
          type="checkbox"
          onChange={handleToggle}
          // show toggle image based on localstorage theme
          checked={theme === "light" ? false : true}
        />

        <img alt="light" className="w-8 h-8 swap-on" />

        <img alt="dark" className="w-8 h-8 swap-off" />
      </label>
    </button>
    */}
        </div>
      </div>
      {!isLoading ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {videosResponse?.items.map(({ snippet }) => (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-base-100 shadow-xl rounded-lg">
              <figure className="">
                <img
                  className="rounded-l-none rounded-t-lg lg:rounded-r-none lg:rounded-l-lg w-full"
                  src={snippet.thumbnails.high.url}
                />
              </figure>
              <div className="m-4 flex flex-col">
                <h2 className="md:text-xl text-3xl">{snippet.title}</h2>
              </div>
            </div>

            // <div className="card lg:card-side bg-base-100 shadow-xl">
            //   <figure className="w-[50%]">
            //     <img src={snippet.thumbnails.medium.url} alt="Album" />
            //   </figure>
            //   <div className="card-body">
            //     <h2 className="card-title">{snippet.title}</h2>
            //     <p></p>
            //     <div className="card-actions justify-end">
            //       <button className="btn btn-error">Watch</button>
            //     </div>
            //   </div>
            // </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          <div className="skeleton h-64 w-1/2" />
          <div className="flex flex-col gap-8 w-1/2">
            <div className="skeleton h-16" />
            <div className="skeleton h-16 " />

            <div className="skeleton h-16" />
          </div>
        </div>
      )}
    </div>
  );
};
