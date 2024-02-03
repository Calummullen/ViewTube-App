"use client";
import { YoutubeService } from "@/app/services/youtube.service";
import { FC, useState } from "react";

const youtubeService = new YoutubeService();

export const Dashboard: FC = () => {
  const TestRequest = async () => {
    const test = await youtubeService.getMostPopularVideos();
    setMainVideoTitle(test.items[0].snippet.description);
  };

  const [mainVideoTitle, setMainVideoTitle] = useState<string>();
  return (
    <div>
      <p>Dashboard Page</p>
      <button onClick={() => TestRequest()}>Click Me</button>
      {mainVideoTitle && <p>{mainVideoTitle}</p>}
    </div>
  );
};
