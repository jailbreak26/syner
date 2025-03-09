import { NavBar } from "../components/NavBar";
import PlayTrailer from "../components/PlayTrailer";
import { useParams } from "react-router-dom";

import Rate from "../components/Rate";
import { useQuery } from "@tanstack/react-query";

//
import { fetchMovieDetails } from "../api/apiService";
import type { MovieDetails } from "../api/models/movie_details";
import SpinnerLoading from "../components/SpinnerLoading";

// Define a TypeScript interface for the route parameters
interface Params {
  [key: string]: string | undefined;
  movieId: string;
}

const MovieDetails: React.FC = () => {
  // Use the useParams hook to get the route parameters
  const { movieId } = useParams<Params>();
  console.log("ID", movieId);

  const {
    data: movieDetails,
    error,
    isLoading,
  } = useQuery<MovieDetails>({
    queryKey: ["movie_details", movieId],
    queryFn: () => {
      if (movieId === null || movieId === undefined)
        return Promise.reject("No MovieId selected");
      return fetchMovieDetails(movieId);
    },
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
  });

  return (
    <div className="h-screen bg-background">
      <NavBar />

      {isLoading && (
        <div className="flex h-screen w-full items-center justify-center">
          <SpinnerLoading size="4rem" marginRight="0px" />
        </div>
      )}

      {error && <h1>Error: ${error.message}</h1>}

      {movieDetails && (
        <div className="flex h-screen w-full flex-col overflow-x-scroll bg-background pt-14">
          <div className="relative h-80 w-full md:h-screen">
            <img
              src={
                movieDetails.info.backdrop_path.length > 0
                  ? movieDetails.info.backdrop_path[0]
                  : movieDetails.info.movie_image
              }
              alt="cover"
              className="absolute h-full w-full"
            />
            <div className="absolute h-full w-full bg-gradient-to-t from-black/100"></div>
          </div>

          <div className="lg:m-15 m-5 flex flex-col md:absolute md:bottom-0 md:m-10">
            <h2 className="text-2xl font-bold text-white">
              {movieDetails.info.name}
            </h2>
            <div className="mt-4 flex items-center justify-start gap-4">
              <Rate rate={movieDetails.info.rating ?? 0} />
              <p className="text-white">{movieDetails.info.duration}</p>

              <div className="rounded-3xl bg-green-500/20 px-2 py-1">
                <p className="text-green-200">
                  {movieDetails.info.releasedate}
                </p>
              </div>
              <p className="font-bold text-white">{movieDetails.info.status}</p>
            </div>

            <div className="order-2 mt-4 flex flex-col gap-1 text-white">
              <p className="font-bold">
                Genre:{" "}
                <span className="font-light">{movieDetails.info.genre}</span>
              </p>
              <p className="font-bold">
                Directed By:{" "}
                <span className="font-light">{movieDetails.info.director}</span>
              </p>
              <p className="font-bold">
                Cast:{" "}
                <span className="font-light">{movieDetails.info.cast}</span>
              </p>
              <p className="font-bold">
                Plot:{" "}
                <span className="font-light">{movieDetails.info.plot}</span>
              </p>
            </div>

            <div className="order-1 mt-5 flex flex-col gap-2 md:order-2 md:flex-row">
              <PlayTrailer
                title="Play"
                streamId={`movie/${movieId}.${movieDetails.movie_data.container_extension}`}
              />
              {movieDetails.info.youtube_trailer && (
                <PlayTrailer
                  title="Trailer"
                  isTrailer={true}
                  streamId={movieDetails.info.youtube_trailer}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
