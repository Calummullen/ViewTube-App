"use client";

import { GetXVideosResponse } from "@/app/entities/youtube/youtube.types";
import { useApp } from "@/utils/context/app.context";
import {
  authenticateYoutubeAccount,
  getSearchTerms,
  getDashboardHeaderData,
  getYoutubes,
  setYoutubeCredentials,
} from "@/utils/youtube/youtube-server";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import LoadingSpinner from "./loading-spinner";

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
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
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
    const setYoutubeCredentialsAfterAuthentication = async (code: string) => {
      console.log("is", isLoading);
      console.log("setYoutubeCredentialsAfterAuthentication", code);
      await setYoutubeCredentials(code);
      await getDashboardData();
    };

    const getDashboardData = async () => {
      const youtubeData = await getDashboardHeaderData();
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

    try {
      setIsDataLoading(true);
      const code = searchParams.get("code");
      if (code) {
        setYoutubeCredentialsAfterAuthentication(code);
      } else if (user.user_metadata.isYoutubeAccountConnected) {
        getDashboardData();
      }
    } catch (e) {
      console.log("error123", e);
    } finally {
      setIsDataLoading(false);
    }
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
    <>
      {isDataLoading ? (
        <LoadingSpinner isFullscreen />
      ) : (
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

            <div className="flex-none">
              <div className="">
                <p>Dashboard Page</p>
              </div>
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
      )}
    </>
  );
};
