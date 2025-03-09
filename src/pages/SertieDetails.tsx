import EpisodeItem from "../components/Episode";
import { NavBar } from "../components/NavBar";
import PlayTrailer from "../components/PlayTrailer";
import Rate from "../components/Rate";
import SeasonsButton from "../components/Seasons";
import SpinnerLoading from "../components/SpinnerLoading";

import { fetchSerieDetails } from "../api/apiService";
import type { SerieDetails } from "../api/models/serie_details";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Params {
  [key: string]: string | undefined;
  movieId: string;
}

interface SeasonParms {
  index: string;
}

const SerieDetails: React.FC = () => {
  const [season, setSeason] = useState<SeasonParms>();

  const { serieId } = useParams<Params>();
  console.log("ID", serieId);

  const {
    data: serieDetails,
    error,
    isLoading,
  } = useQuery<SerieDetails>({
    queryKey: ["serie_details", serieId],
    queryFn: () => {
      if (serieId === null || serieId === undefined)
        return Promise.reject("No SerieId selected");
      return fetchSerieDetails(serieId);
    },
    // staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
  });

  function getListSeason() {
    const episode = serieDetails!.episodes;
    const seasons = new Set<string>(Object.keys(episode));

    return Array.from(seasons);
  }

  return (
    <div className="h-full bg-background  md:h-screen">
      <NavBar />

      {isLoading && (
        <div className="flex h-screen w-full items-center justify-center">
          <SpinnerLoading size="4rem" marginRight="0px" />
        </div>
      )}

      {error && <h1>Error: ${error.message}</h1>}

      {serieDetails && (
        <div className="flex h-full w-full flex-col overflow-hidden bg-background pt-14 ">
          <div className="relative h-full min-h-80 w-full">
            <img
              src={
                serieDetails.info.backdrop_path.length > 0
                  ? serieDetails.info.backdrop_path[0]
                  : serieDetails.info.cover
              }
              alt="cover"
              className="absolute h-full w-full"
            />
            <div className="absolute h-full w-full bg-gradient-to-t from-black/100"></div>
          </div>

          <div className="lg:m-15 m-5 flex flex-col md:absolute md:bottom-0 md:m-10">
            <h2 className="text-2xl font-bold text-white">
              {serieDetails.info.name}
            </h2>
            <div className="mt-4 flex items-center justify-start gap-4">
              <Rate rate={serieDetails.info.rating} />

              <div className="rounded-3xl bg-green-500/20 px-2 py-1">
                <p className="text-green-200">
                  {serieDetails.info.releaseDate}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1 text-white">
              <p className="font-bold">
                Genre:{" "}
                <span className="font-light">{serieDetails.info.genre}</span>
              </p>
              <p className="font-bold">
                Directed By:{" "}
                <span className="font-light">{serieDetails.info.director}</span>
              </p>
              <p className="font-bold">
                Cast:{" "}
                <span className="font-light">{serieDetails.info.cast}</span>
              </p>
              <p className="font-bold">
                Plot:{" "}
                <span className="font-light">{serieDetails.info.plot}</span>
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2 md:order-2 md:flex-row">
              <SeasonsButton
                title="Seasons"
                listItems={getListSeason()}
                onSelect={(index) => {
                  console.log("Season", index);
                  setSeason({ index: index });
                }}
              />
              {serieDetails.info.youtube_trailer && (
                <PlayTrailer
                  title="Trailer"
                  isTrailer={true}
                  streamId={serieDetails.info.youtube_trailer}
                />
              )}
            </div>
          </div>
        </div>
      )}
      {season && (
        <div className=" bg-background px-6 pb-10 md:px-10 md:pt-5">
          <div className="mb-5 flex items-center gap-3 text-white">
            <p className="text-lg font-bold">Seaons {season?.index}</p>
            <p className="text-primary-800">Episodes</p>
          </div>

          {/* List Episodes */}

          <div className="flex flex-col gap-3">
            {serieDetails?.episodes[season.index].map((item, index) => (
              <EpisodeItem
                key={"episode-" + index}
                duration={item.info.duration}
                name={item.title}
                image={serieDetails.info.cover}
                href={`/fullVideo/series/${item.id}.${item.container_extension}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SerieDetails;
