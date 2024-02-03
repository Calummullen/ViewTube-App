// export const getMostPopularVideos = async () => {
//     const res = await fetch(
//         "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&key=AIzaSyDMkFfZV_BL3lnYdhhlz7_NNtFj24KZm10"
//       );
// }

import { BaseService } from "./base.service";

export class YoutubeService extends BaseService {
  constructor() {
    if (
      !process.env.NEXT_PUBLIC_GOOGLE_API_URL ||
      !process.env.GOOGLE_API_KEY
    ) {
      throw new Error("Required env vars for YoutubeService not set.");
    }
    super(process.env.NEXT_PUBLIC_GOOGLE_API_URL);
  }

  // TODO - Add type to return
  async getMostPopularVideos() {
    return this.makeRequest("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "US",
        key: process.env.GOOGLE_API_KEY ?? "",
      },
    });
  }
}
