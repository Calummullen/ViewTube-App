interface MostPopularVideosResponse {
  etag: string;
  items: MostPopularVideoItem[];
  kind: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

interface MostPopularVideoItem {
  contentDetails: {
    caption: boolean;
    contentRating: {};
    definition: string;
    dimension: string;
    duration: string;
    licensedContent: boolean;
    projection: string;
    regionRestrictions: {
      allowed: string[];
    };
  };
  etag: string;
  id: string;
  kind: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    defaultAudioLanguage: string;
    description: string;
    liveBroadcastContent: string;
    localized: {
      description: string;
      title: string;
    };
    publishedAt: string;
    thumbnails: {
      default: Thumbnail;
      high: Thumbnail;
      maxres: Thumbnail;
      medium: Thumbnail;
      standard: Thumbnail;
    };
    title: string;
  };
  statistics: {
    commentCount: string;
    favoriteCount: string;
    likeCount: string;
    viewCount: string;
  };
}

interface Thumbnail {
  height: number;
  url: string;
  width: number;
}
