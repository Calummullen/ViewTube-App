"use server";

// import { google } from "googleapis";

// // const youtube = google.youtube("v3");

// const youtubeService = google.youtube({
//   version: "v3",
//   auth: process.env.GOOGLE_API_KEY,
// });

// export default youtubeService;

// export const getYoutubes = async () => {

// }

export const getYoutubes = async () => {
  const url = `${
    process.env.GOOGLE_API_URL
  }/videos?part=snippet,contentDetails,statistics&${new URLSearchParams({
    chart: "mostPopular",
    regionCode: "US",
    key: process.env.GOOGLE_API_KEY ?? "",
  })}`;
  console.log("url123", url);
  const test = await fetch(url, {
    headers: {
      Accept: "application/json",
      //   Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
    },
    method: "GET",
  });

  return await test.json();
};
