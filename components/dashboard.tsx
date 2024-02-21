"use client";

import { YoutubeService } from "@/app/services/youtube.service";
import { getKeywords, getYoutubes } from "@/utils/youtube/youtube-server";
import { FC, useEffect, useState } from "react";

// const youtubeService = new YoutubeService();

export const Dashboard: FC = () => {
  const testMe = async () => {
    const test = await getYoutubes();
    console.log("calumpog", test.items[0]);
    // setMainVideoTitle(test.items[0].snippet.title);
    // setMainViews(test.items[0].snippet.publishedAt);
  };

  const testMeKeywords = async () => {
    const test = await getKeywords("warzone");
    console.log("keyword response", test.items);
  };
  // const TestRequest = async () => {
  //   const test = await youtubeService.getMostPopularVideos();
  //   console.log("fff", test);
  //   setMainVideoTitle(test.items[0].snippet.title);
  //   setMainViews(test.items[0].snippet.publishedAt);
  // };

  const [mainVideoTitle, setMainVideoTitle] = useState<string>();
  const [mainVideoViews, setMainViews] = useState<string>();
  return (
    <div className="bg-base-300 shadow-lg px-4 sm:px-8">
      <h1 className="text-primary">Calum Mullen</h1>
      <button className="bg-base-300">Test123</button>
      {/* <div className="flex-1">
        <img alt="OM" className="btn btn-ghost p-0" />
        <h1 className="text-lg font-bold mx-4">Your Website</h1>
      </div> */}
      <div className="flex-none">
        <div className="">
          <p>Dashboard Page</p>
          <button onClick={testMe}>Click Me (Videos)</button>
          {mainVideoTitle && <p>{mainVideoTitle}</p>}
          {mainVideoViews && <p>{new Date(mainVideoViews).toLocaleString()}</p>}
          <button onClick={testMeKeywords}>Click Me (Keywords)</button>
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
  );
};
