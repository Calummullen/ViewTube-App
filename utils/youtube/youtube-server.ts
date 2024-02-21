"use server";

// import { google } from "googleapis";
import { format, addMonths, addDays } from "date-fns";

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
    console.log("response", response);
    return response;
    console.log(response.items[0].snippet);
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
    console.log("response", responseTest);
    // console.log("response", (await response.json()) as KeywordTrendResponse);
    return responseTest;
  } catch (error) {
    console.log("error", error);
  }
};
