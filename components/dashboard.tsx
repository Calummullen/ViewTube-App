"use client";
import { YoutubeService } from "@/app/services/youtube.service";
import { FC, useState } from "react";

const youtubeService = new YoutubeService();

export const Dashboard: FC = () => {
  const TestRequest = async () => {
    const test = await youtubeService.getMostPopularVideos();
    console.log(test);
    setMainVideoTitle(test.items[0].snippet.title);
    setMainViews(test.items[0].snippet.publishedAt);
  };

  const [mainVideoTitle, setMainVideoTitle] = useState<string>();
  const [mainVideoViews, setMainViews] = useState<string>();
  return (
    <div>
      <p>Dashboard Page</p>
      <button onClick={() => TestRequest()}>Click Me</button>
      {mainVideoTitle && <p>{mainVideoTitle}</p>}
      {mainVideoViews && <p>{new Date(mainVideoViews).toLocaleString()}</p>}
    </div>
  );
};
