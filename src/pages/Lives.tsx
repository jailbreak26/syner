import { useState } from "react";
import ListItems from "../components/ListItems";
import { NavBar } from "../components/NavBar";

import { useQuery } from "@tanstack/react-query";

//
import {
  fetchLiveCategoriies,
  CategoriesResponse,
  fetchLiveChannels,
  LiveChannelsResponse,
} from "../api/apiService";
import { getUserData } from "../api/userDataService";
import { kCategories, kChannels } from "../constants";
import PlayerVideo from "../components/Player/Player";

const LivesPage = () => {
  //States
  const [categoryIndex, setCategoryIndex] = useState<number>();
  const [channel, setChannel] = useState<number>();

  const [videoUrl, setVideoUrl] = useState<string>();

  const {
    data: categories,
    error: catyError,
    isLoading: catyLoading,
  } = useQuery<CategoriesResponse[]>({
    queryKey: ["categories"],
    queryFn: fetchLiveCategoriies,
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
  });

  const {
    data: channels,
    error: channelError,
    isLoading: channelLoading,
  } = useQuery<LiveChannelsResponse[]>({
    queryKey: ["channels", categoryIndex],

    queryFn: () => {
      if (categoryIndex === null || categories === undefined)
        return Promise.reject("No category selected");
      return fetchLiveChannels(categories[categoryIndex!].category_id);
    },
    enabled: categoryIndex !== null, // Enable query only when a category is selected
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
  });

  return (
    <>
      <NavBar />
      <div className="flex h-screen w-full flex-col overflow-hidden  bg-background pt-14 md:flex-row">
        <div className="order-2 flex h-full w-full  overflow-x-scroll  md:order-1 md:overflow-hidden lg:w-4/5">
          <ListItems
            title={kCategories}
            onClick={(index) => setCategoryIndex(index)}
            selectedIndex={categoryIndex}
            loading={catyLoading}
            error={catyError}
            isLive={true}
            list={
              categories != null
                ? categories.map((item) => ({
                    name: item.category_name,
                  }))
                : []
            }
          />
          <ListItems
            title={kChannels}
            selectedIndex={channel}
            loading={channelLoading && categoryIndex != null}
            error={channelError}
            isLive={true}
            onClick={(index) => {
              setChannel(index);
              //TODO: play video
              var userData = getUserData();
              var url = `${userData?.url}/live/${userData?.username}/${userData?.password}/${channels![index].stream_id}.m3u8`;
              setVideoUrl(url);
            }}
            list={
              channels != null
                ? channels.map((item) => ({
                    name: item.name,
                    icon: item.stream_icon,
                  }))
                : []
            }
          />
        </div>

        <PlayerVideo isSelected={channel != null} videoUrl={videoUrl} />
      </div>
    </>
  );
};

export default LivesPage;
