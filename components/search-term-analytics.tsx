"use client";

import { FC, useState } from "react";
import { format, addDays } from "date-fns";
import { getSearchTermTrends } from "@/utils/youtube/youtube-server";
import {
  SearchTermTrendResponse,
  RelatedDataType,
  SingleDataType,
} from "@/app/entities/youtube/youtube.types";
import cn from "classnames";
import { SearchTermResults } from "@/app/entities/youtube/placeholder-data";
import { useForm, SubmitHandler } from "react-hook-form";
import LabelAndInputForm from "./reusable/label-and-input";
import { LabelInputProps } from "./reusable/props";
import LabelAndInput from "./reusable/label-and-input";
import LoadingSpinner from "./loading-spinner";
import SkeletonLoader from "./reusable/skeleton-loader";

const getRelatedSearchTerms = (
  data: SearchTermTrendResponse,
  initialSearchTerm: string
) => {
  // Get related search terms
  const relatedSearchTerms = [
    initialSearchTerm,
    ...(
      data?.tasks[0]?.result[0]?.items.find(
        (x) => x.title === "Related queries"
      )?.data as RelatedDataType
    ).top
      .slice(0, 9)
      .map((x) => x.query),
  ];
  return relatedSearchTerms;

  // Get singular average
  //   const average =
  //     items.reduce((previous, current) => {
  //       if (!current) return previous;
  //       return Number(previous) + Number(current.values[0]);
  //     }, 0) / items.length;
  //   console.log("average", average);
};

// const calculateAverage = (data: KeywordTrendResponse) => {
//   const items = data?.tasks[0]?.result[0]?.items[0]?.data as SingleDataType[];

//   const average =
//     items.reduce((previous, current) => {
//       if (!current) return previous;
//       return Number(previous) + Number(current.values[0]);
//     }, 0) / items.length;
// };

const SearchTermAnalytics: FC = () => {
  const [searchTermInterest, setSearchTermInterest] =
    useState<SearchTermTrendResponse>();

  const [tableResults, setTableResults] = useState<
    { searchTerm: string; average: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, getValues } = useForm<LabelInputProps>();

  const onSubmit: SubmitHandler<LabelInputProps> = async ({ searchTerm }) => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    setIsLoading(true);
    console.log("here", searchTerm);
    return;
    // Get the initial response with the given search term
    const individualSearchTermResponse = await getSearchTermTrends({
      searchTerms: [searchTerm],
    });
    // Retrieve the 'tasks' object from the response
    const searchTermTasks: SearchTermTrendResponse = {
      tasks: individualSearchTermResponse.tasks,
    };

    // Get the related search terms from the response and split them evenly into 2 arrays
    const relatedSearchTerms = getRelatedSearchTerms(
      searchTermTasks,
      searchTerm
    );
    const itemsSplitIndex = Math.ceil(relatedSearchTerms.length / 2);
    const newItems = [
      relatedSearchTerms.slice(0, itemsSplitIndex),
      relatedSearchTerms.slice(itemsSplitIndex, relatedSearchTerms.length),
    ];

    // Make 2 follow up requests to get search term data for both arrays of search terms
    const multipleSearchTermsResponse = await Promise.all(
      newItems.map(async (item) => {
        const response = await getSearchTermTrends({
          searchTerms: item,
        });
        return response.tasks;
      })
    );

    // Iterate over new response of multiple search terms, find the search term and the average and return them in an object array
    const mappedAveragesAndSearchTerms = multipleSearchTermsResponse.map(
      (item) => {
        const averageAndSearchTerm = item[0]?.result[0]?.items.find(
          (i: { title: string }) => i.title === "Interest over time"
        );

        const formattedSearchTerms = averageAndSearchTerm.averages.map(
          (_: any, subIndex: number) => {
            return {
              searchTerm: averageAndSearchTerm?.searchTerms[subIndex],
              average: averageAndSearchTerm?.averages[subIndex],
            };
          }
        );
        return formattedSearchTerms;
      }
    );

    // Returned object is an array of array objects, so we flatten it into 1 array and sort by rating highest
    setTableResults(
      mappedAveragesAndSearchTerms.flat(1).sort((a, b) => b.average - a.average)
    );
  };

  return (
    <div className="md:my-4 lg:mx-16 animate-in flex flex-col gap-4">
      <h3 className="font-bold text-4xl mb-8">Search Term Analytics</h3>
      <p className="text-xl">
        Search term analytics provides information about a specific search term
        and its nine closest matches over the past 30 days.
      </p>
      <p className="text-xl">
        Each search term is assigned a score ranging from 0 to 100, representing
        the average popularity of the term over the last 30 days. A higher score
        indicates a high frequency of searches, while a lower score suggests a
        lower search rate.*
      </p>
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-bold">Search term popularity</p>
        <div className="flex flex-row justify-between h-full lg:w-2/3 w-full text-black text-center align-middle">
          <div className="bg-blue-500 w-full py-4">Very high</div>
          <div className="bg-green-500 w-full py-4">High</div>
          <div className="bg-yellow-500 w-full py-4">Average</div>
          <div className="bg-orange-500 w-full py-4">Low</div>
          <div className="bg-red-500 w-full py-4">Very low</div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelAndInput
          onSubmit={handleSubmit(onSubmit)}
          labelText="Enter Search Term"
          placeholder="e.g. how to bake a cake"
          {...register("searchTerm")}
        />
      </form>
      {/* <form
        className="flex flex-col gap-4 my-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-xl" htmlFor="imagePrompt">
          Enter Search Term
        </label>
        <div className="flex flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="e.g. how to bake a cake"
            className="input input-bordered grow"
            {...register("searchTerm")}
          />
        </div>
      </form> */}
      {/* <button onClick={async () => onSubmit("taylor swift live")}>
        Click me (search term trends)
      </button> */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <SkeletonLoader rowCount={10} />
        ) : (
          // // <LoadingSpinner />
          // <div className="flex flex-col gap-4 w-full">
          //   <div className="flex flex-row gap-4">
          //     <div className="skeleton h-12 w-2/3"></div>
          //     <div className="skeleton h-12 w-1/3"></div>
          //   </div>
          //   <div className="flex flex-row gap-4">
          //     <div className="skeleton h-10 w-2/3"></div>
          //     <div className="skeleton h-10 w-1/3"></div>
          //   </div>
          // </div>
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-xl">
                <th>Search Term</th>
                <th>Score</th>
                {/* <th className="w-[175px]">
                  <button
                    disabled={rowsMarkedForDeletion.length === 0}
                    className="btn btn-outline btn-error btn-sm w-full"
                    onClick={deleteRows}
                  >
                    Delete {rowsMarkedForDeletion.length} row
                    {rowsMarkedForDeletion.length > 1 ||
                    rowsMarkedForDeletion.length === 0
                      ? "s"
                      : ""}
                  </button>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {/* {tableResults.map(({ searchTerm, average }) => ( */}
              {SearchTermResults.sort((a, b) => b.average - a.average).map(
                ({ searchTerm, average }) => (
                  <tr key={`${searchTerm}`} className="text-lg">
                    <th>{searchTerm}</th>
                    <td>
                      <p
                        className={cn("", {
                          "text-blue-500": average > 80,
                          "text-green-500": average > 60 && average <= 80,
                          "text-yellow-500": average > 40 && average <= 60,
                          "text-orange-500": average > 20 && average <= 40,

                          "text-red-500": average <= 20,
                        })}
                      >
                        {average}
                      </p>
                    </td>
                    {/* {!showDeleteColumn ? (
                    <td className="flex-col justify-center items-center">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-error ml-14"
                        onChange={(e) => {
                          e.target.checked
                            ? setRowsMarkedForDeletion([
                                ...rowsMarkedForDeletion,
                                item.id,
                              ])
                            : setRowsMarkedForDeletion((state) =>
                                state.filter((i) => i !== item.id)
                              );
                        }}
                      />
                    </td>
                  ) : (
                    ""
                  )} */}
                  </tr>
                )
              )}
              {/* row 2 */}
            </tbody>
          </table>
        )}
      </div>
      <p>
        * Combining popular search terms does not always guarantee higher search
        popularity. If you're unsure, rerun the tool with your updated search
        term to assess its current popularity.
      </p>
    </div>
  );
};

export default SearchTermAnalytics;
