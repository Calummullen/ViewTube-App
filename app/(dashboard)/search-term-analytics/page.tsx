import SearchTermAnalytics from "@/components/search-term-analytics";
import { FC, Suspense } from "react";

const SearchTermAnalyticsPage: FC = () => {
  return (
    <Suspense>
      <SearchTermAnalytics />
    </Suspense>
  );
};

export default SearchTermAnalyticsPage;
