"use client";

import { FC } from "react";

const LoadingSpinner: FC<{ isFullscreen?: boolean }> = ({
  isFullscreen = false,
}) =>
  //   <div className=" flex items-center justify-center h-screen">
  //     <span className="loading loading-spinner loading-lg h-full"></span>
  //   </div>
  isFullscreen ? (
    <div className="fixed top-1/2 left-1/2 md:left-[55%]">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="w-full flex flex-row items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

export default LoadingSpinner;
