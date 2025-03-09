import HomePage from "./pages/Home";
import LivesPage from "./pages/Lives";
import LoginPage from "./pages/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MoviesPage from "./pages/Movies";
import SeriesPage from "./pages/Series";
import MovieDetails from "./pages/MovieDetails";
import SerieDetails from "./pages/SertieDetails";
import FullPlayerVideo from "./components/FullPlayer/FullPlayer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/lives",
    element: <LivesPage />,
  },
  {
    path: "/movies",
    element: <MoviesPage />,
  },

  {
    path: "/series",
    element: <SeriesPage />,
  },
  {
    path: "/movies/details/:movieId",
    element: <MovieDetails />,
  },
  {
    path: "/series/details/:serieId",
    element: <SerieDetails />,
  },
  {
    path: "/fullVideo/:typePlayer/:videoId/",
    element: <FullPlayerVideo />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
