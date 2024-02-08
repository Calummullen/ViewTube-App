"use client";

import { FC } from "react";

const LoadingSpinner: FC = () => (
  //   <div className=" flex items-center justify-center h-screen">
  //     <span className="loading loading-spinner loading-lg h-full"></span>
  //   </div>
  <div className="fixed top-1/2 left-[55%]">
    <span className="loading loading-spinner loading-lg"></span>
  </div>
);

export default LoadingSpinner;
