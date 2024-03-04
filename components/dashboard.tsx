"use client";

import { GetXVideosResponse } from "@/app/entities/youtube/youtube.types";
import { YoutubeService } from "@/app/services/youtube.service";
import { useApp } from "@/utils/context/app.context";
import Image from "next/image";
import {
  getSearchTerms,
  getYoutubes,
  getFirstXVideosForUser,
  getChannelIdViaHandle,
  authenticateYoutubeAccount,
  setYoutubeCredentials,
  getYoutubeUserData,
} from "@/utils/youtube/youtube-server";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface YoutubeData {
  title: string;
  viewCount: string;
  subscriberCount: string;
  videoCount: string;
  thumbnailsUrl: {
    url: string;
    width: number;
    height: number;
  };
}

// const youtubeService = new YoutubeService();

export const Dashboard: FC = () => {
  const { user, isLoading, setIsLoading } = useApp();
  const searchParams = useSearchParams();
  const [youtubeUserData, setYoutubeUserData] = useState<YoutubeData>();
  const testMe = async () => {
    const test = await getYoutubes();
    // setMainVideoTitle(test.items[0].snippet.title);
    // setMainViews(test.items[0].snippet.publishedAt);
  };

  const testGetFirstXVideosForUser = async () => {
    setIsLoading(true);
    // TODO - Change this to use Youtube handle from OAuth
    // const response = await getFirstXVideosForUser(
    //   user.user_metadata.youtubeHandle
    // );
    // // setVideosResponse(test.items[0].snippet);
    // console.log(response);
    // setVideosResponse(response);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchParams) {
        const code = searchParams.get("code");
        if (code) {
          await setYoutubeCredentials(code);
        }
      }
    };

    const getDashboardData = async () => {
      const youtubeData = await getYoutubeUserData();
      const parsedData = JSON.parse(youtubeData);
      if (parsedData.data.items) {
        if (parsedData.data.items[0]) {
          const data = parsedData.data.items[0];
          setYoutubeUserData({
            title: data.snippet?.customUrl.substring(1) || "",
            viewCount: data.statistics?.viewCount || "",
            subscriberCount: data.statistics?.subscriberCount || "",
            videoCount: data.statistics?.videoCount || "",
            thumbnailsUrl: {
              url: data.snippet?.thumbnails.default.url || "",
              height: data.snippet?.thumbnails.default.height,
              width: data.snippet?.thumbnails.default.width,
            },
          });
        }
      }
    };

    if (user.user_metadata.isYoutubeAccountConnected) {
      getDashboardData();
    }
    fetchData();
    // testGetFirstXVideosForUser();
  }, []);

  const testOAuth = async () => {
    const url = await authenticateYoutubeAccount();
    console.log("url", url);
  };

  const testMeKeywords = async () => {
    const test = await getSearchTerms("warzone");
  };
  // const TestRequest = async () => {
  //   const test = await youtubeService.getMostPopularVideos();
  //   console.log("fff", test);
  //   setMainVideoTitle(test.items[0].snippet.title);
  //   setMainViews(test.items[0].snippet.publishedAt);
  // };
  console.log(youtubeUserData);
  const [mainVideoTitle, setMainVideoTitle] = useState<string>();
  const [mainVideoViews, setMainViews] = useState<string>();
  const [videosResponse, setVideosResponse] = useState<GetXVideosResponse>();

  return (
    <div className="px-4 sm:p-8 flex flex-col gap-8">
      {youtubeUserData && (
        <div className="bg-base-300 shadow-lg">
          <div className="m-4 flex flex-col gap-4 items-center">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={youtubeUserData.thumbnailsUrl.url} />
              </div>
            </div>
            {/* <Image
              width={youtubeUserData.thumbnailsUrl.width}
              height={youtubeUserData.thumbnailsUrl.height}
              src={youtubeUserData.thumbnailsUrl.url}
              alt="youtubeThumbnail"
              className="avatar image"
              style={{
                height: youtubeUserData.thumbnailsUrl.height,
                width: youtubeUserData.thumbnailsUrl.width,
              }}
            /> */}
            <p className="font-bold text-6xl">
              Welcome back{" "}
              <span className="text-red-500">{youtubeUserData?.title}</span>
            </p>
            <p className="text-xl">
              View count for all videos: {youtubeUserData.viewCount} (
              <span className="text-green-500 text-base">
                x% increase from last day/week/month
              </span>
              )
            </p>
            {/* Some metric to show their last data (store this) */}
            <p className="text-xl">
              Current subscriber count: {youtubeUserData.subscriberCount} (
              <span className="text-green-500 text-base">
                x% increase from last day/week/month
              </span>
              )
            </p>
          </div>
        </div>
      )}
      <div className="bg-base-300 shadow-lg">
        <h1 className="text-primary">Calum Mullen</h1>
        {/* <button onClick={testOAuth} className="bg-base-300">
          Test Auth
        </button> */}
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
          {videosResponse?.items?.map(({ snippet }) => (
            <div
              key={snippet.title}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-base-100 shadow-xl rounded-lg"
            >
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
