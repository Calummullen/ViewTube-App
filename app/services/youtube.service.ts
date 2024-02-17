import { BaseService } from "./base.service";

export class YoutubeService extends BaseService {
  constructor() {
    if (
      !process.env.NEXT_PUBLIC_GOOGLE_API_URL ||
      !process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    ) {
      throw new Error("Required env vars for YoutubeService not set.");
    }
    super(process.env.NEXT_PUBLIC_GOOGLE_API_URL);
  }

  // TODO - Add type to return
  async getMostPopularVideos() {
    return this.makeRequest<MostPopularVideosResponse>("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "US",
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "",
      },
    });
  }
}

// export const getMostPopularVideosTest = async () => {
//   if (!process.env.GOOGLE_API_URL || !process.env.GOOGLE_API_KEY) {
//     throw new Error("Required env vars for YoutubeService not set.");
//   }
//   console.log(process.env.GOOGLE_API_URL);
//   const test = await fetch(
//     `https://youtube.googleapis.com/youtube/v3?${new URLSearchParams({
//       part: "snippet,contentDetails,statistics",
//       chart: "mostPopular",
//       regionCode: "US",
//       key: process.env.GOOGLE_API_KEY ?? "",
//     })}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method: "GET",
//     }
//   );
//   console.log(test);
// };
