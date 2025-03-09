import { NavBar } from "../components/NavBar";
import ListItems from "../components/ListItems";
import MovieCard from "../components/MovieCard";

import {
  fetchSeriesCategories,
  fetchSeriesChannels,
  CategoriesResponse,
  LiveChannelsResponse,
} from "../api/apiService";
import LoadingLinear from "../components/LoadingLinear/LoadingLinear";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { kCategories } from "../constants";

const SeriesPage = () => {
  const [categoryIndex, setCategoryIndex] = useState<number>();

  const {
    data: categories,
    error: catyError,
    isLoading: catyLoading,
  } = useQuery<CategoriesResponse[]>({
    queryKey: ["series_categories"],
    queryFn: fetchSeriesCategories,
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
  });

  const {
    data: channels,

    isLoading: channelLoading,
  } = useQuery<LiveChannelsResponse[]>({
    queryKey: ["channels", categoryIndex],

    queryFn: () => {
      if (categoryIndex === null || categories === undefined)
        return Promise.reject("No category selected");
      return fetchSeriesChannels(categories[categoryIndex!].category_id);
    },
    enabled: categoryIndex !== null, // Enable query only when a category is selected
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
  });

  return (
    <>
      <NavBar />

      <div className="flex h-screen w-full flex-row overflow-hidden  bg-background pt-14">
        <div className="flex h-full w-1/3 overflow-x-scroll md:w-80">
          <ListItems
            isLive={false}
            title={kCategories}
            onClick={(index) => setCategoryIndex(index)}
            selectedIndex={categoryIndex}
            list={
              categories != null
                ? categories.map((item) => ({
                    name: item.category_name,
                  }))
                : []
            }
            loading={catyLoading}
            error={catyError}
          />
        </div>

        <div className="block w-full overflow-x-scroll">
          {categoryIndex && channelLoading === true ? <LoadingLinear /> : null}
          <div className="grid w-full grid-flow-row auto-rows-max grid-cols-3  gap-2     p-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
            {channels != null
              ? channels.map((item) => (
                  <MovieCard
                    key={item.series_id}
                    image={item.cover}
                    name={item.name}
                    href={`details/${item.series_id}`}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default SeriesPage;
