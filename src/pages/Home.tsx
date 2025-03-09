import CardHomeItem from "../components/CardHomeItem";
import { NavBar } from "../components/NavBar";
import { kLive, kMovies, kSeries } from "../constants";

import live_icon from "../public/live-icon.svg";
import movie_icon from "../public/movie-icon.svg";
import serie_icon from "../public/serie-icon.svg";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div className="flex h-screen w-full flex-col items-center gap-4 bg-background p-3 pt-20 md:flex-row md:pt-0">
        <CardHomeItem title={kLive} icon={live_icon} href="/lives" />
        <CardHomeItem title={kMovies} icon={movie_icon} href="/movies" />
        <CardHomeItem title={kSeries} icon={serie_icon} href="/series" />
      </div>
      <div className="absolute bottom-0 mb-2 flex w-full items-center justify-center">
        <h2 className="text-sm text-white">
          Created By{" "}
          <a
            target="_blank"
            href="https://mouadzizi.com"
            className="text-primary-500 hover:text-primary-800"
          >
            @Mouad Zizi
          </a>
        </h2>
      </div>
    </>
  );
};

export default HomePage;
