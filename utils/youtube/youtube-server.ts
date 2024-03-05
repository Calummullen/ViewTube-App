"use server";

import { markAccountAsYoutubeAuthenticated } from "@/app/actions";
import { GetXVideosResponse } from "@/app/entities/youtube/youtube.types";
import { addMonths, format } from "date-fns";
import { google } from "googleapis";
import { redirect } from "next/navigation";

const client = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/",
});

// // const youtube = google.youtube("v3");

// const youtubeService = google.youtube({
//   version: "v3",
//   auth: process.env.GOOGLE_API_KEY,
// });

// export default youtubeService;

// export const getYoutubes = async () => {

// }
// OAUTH
export const authenticateYoutubeAccount = async () => {
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/youtube.channel-memberships.creator",
      "https://www.googleapis.com/auth/youtube.readonly",
    ],
    include_granted_scopes: true,
  });

  await markAccountAsYoutubeAuthenticated(authUrl);
};

export const setYoutubeCredentials = async (code: string) => {
  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);
  } catch (e) {
    console.info("error123", e);
  }
};

export const getDashboardHeaderData = async () => {
  console.log("credentials in testOauthYoutube", client);
  const youtubeUserData = await google.youtube("v3").channels.list({
    auth: client,
    mine: true,
    part: ["snippet,contentDetails,statistics"],
  });
  return JSON.stringify(youtubeUserData);
};
// OAUTH

export const getYoutubes = async () => {
  const url = `${
    process.env.GOOGLE_API_URL
  }/videos?part=snippet,contentDetails,statistics&${new URLSearchParams({
    // chart: "mostPopular",
    id: "065TFbxlWJ8",
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

export const getChannelIdViaHandle = async (handle: string) => {
  const url = `${
    process.env.GOOGLE_API_URL
  }/channels?part=id&${new URLSearchParams({
    // chart: "mostPopular",
    forHandle: handle,
    key: process.env.GOOGLE_API_KEY ?? "",
  })}`;

  try {
    const test = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    });

    const response = await test.json();
    // console.log("response", response);
    return response;
  } catch (error) {
    console.log("errror", error);
  }
};

export const getFirstXVideosForUser = async (
  handle: string
): Promise<GetXVideosResponse> => {
  console.log("handle", handle);
  const { items } = await getChannelIdViaHandle(handle);

  const url = `${
    process.env.GOOGLE_API_URL
  }/search?part=snippet&${new URLSearchParams({
    // chart: "mostPopular",
    channelId: items[0].id,
    order: "date",
    type: "video",
    videoDutation: "medium",
    key: process.env.GOOGLE_API_KEY ?? "",
  })}`;

  try {
    const test = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    });

    const response = await test.json();

    return response;
  } catch (error) {
    console.log("errror", error);
    throw error;
  }
};

export const getSearchTerms = async (query: string) => {
  const url = `${process.env.GOOGLE_API_URL}/search?${new URLSearchParams({
    q: query,
    part: "snippet",
    regionCode: "GB",
    key: process.env.GOOGLE_API_KEY ?? "",
  })}`;

  try {
    const test = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    });

    const response = await test.json();

    return response;
  } catch (error) {
    console.log("errror", error);
  }
};

interface SearchTermTrendsProps {
  searchTerms: string[];
  locationName?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const getSearchTermTrends = async ({
  searchTerms,
  locationName,
  dateFrom,
  dateTo,
}: SearchTermTrendsProps) => {
  const url = `${process.env.DATAFORSEO_URL}/keywords_data/google_trends/explore/live`;
  const headers = {
    Authorization: `Basic ${process.env.DATAFORSEO_KEY}`,
    "Content-Type": "application/json",
  };
  const currentDate = new Date();
  const formattedDateFrom = addMonths(new Date(), -1);

  const body = [
    {
      location_name: locationName ?? "United States",
      date_from: format(formattedDateFrom, "yyyy-MM-dd"),
      date_to: format(currentDate, "yyyy-MM-dd"),
      // date_to: format(formattedDateTo, "yyyy-MM-dd"),
      // datetime_to: formattedDateTo,
      // datetime_from: format(dateFrom ?? new Date(), "yyyy-MM-dd"),
      type: "youtube",
      keywords: searchTerms,
    },
  ];

  try {
    const response = await fetch(url, {
      headers,
      method: "POST",
      body: JSON.stringify(body),
    });

    const responseTest = await response.json();

    // console.log("response", (await response.json()) as KeywordTrendResponse);
    return responseTest;
  } catch (error) {
    console.log("error", error);
  }
};
