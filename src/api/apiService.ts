// src/apiService.ts
import axios from "axios";
import {
  getUserData,
  saveUserData,
  clearUserData,
  UserData,
} from "./userDataService";
import { MovieDetails } from "./models/movie_details";
import { SerieDetails } from "./models/serie_details";

///Authentication
export const login = async (
  url: string,
  username: string,
  password: string,
): Promise<UserData> => {
  try {
    clearUserData(); //clear old data first
    const response = await axios.get(
      `${url}/player_api.php?username=${username}&password=${password}`,
    );
    if (response.status == 200) {
      // Save the user data in localStorage
      const userData = { url, username, password };
      saveUserData(userData);

      return userData;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

///Models
export interface CategoriesResponse {
  category_id: string | number;
  category_name: string;
}

export interface LiveChannelsResponse {
  name: string;
  stream_id: number | string;
  stream_icon?: string;
  series_id?: string | number; // this for series
  cover?: string;
}

///Live
export const fetchLiveCategoriies = async (): Promise<CategoriesResponse[]> => {
  const userData = getUserData();
  if (!userData) throw new Error("User is not logged in");

  const response = await axios.get(
    `${userData.url}/player_api.php?password=${userData.password}&username=${userData.username}&action=get_live_categories`,
  );
  // Check if response is not OK
  if (response.status !== 200) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.data;
};

export const fetchLiveChannels = async (
  catyId: string | number,
): Promise<LiveChannelsResponse[]> => {
  const userData = getUserData();
  if (!userData) throw new Error("User is not logged in");

  const response = await axios.get(
    `${userData.url}/player_api.php?password=${userData.password}&username=${userData.username}&action=get_live_streams&category_id=${catyId}`,
  );
  // Check if response is not OK
  if (response.status !== 200) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.data;
};

///Movies
export const fetchMovieCategories = async (): Promise<CategoriesResponse[]> => {
  const userData = getUserData();
  if (!userData) throw new Error("User is not logged in");

  const response = await axios.get(
    `${userData.url}/player_api.php?password=${userData.password}&username=${userData.username}&action=get_vod_categories`,
  );
  // Check if response is not OK
  if (response.status !== 200) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.data;
};

export const fetchMovieChannels = async (
  catyId: string | number,
): Promise<LiveChannelsResponse[]> => {
  const userData = getUserData();
  if (!userData) throw new Error("User is not logged in");

  const response = await axios.get(
    `${userData.url}/player_api.php?password=${userData.password}&username=${userData.username}&action=get_vod_streams&category_id=${catyId}`,
  );
  // Check if response is not OK
  if (response.status !== 200) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.data;
};

export const fetchMovieDetails = async (
  movieId: string,
): Promise<MovieDetails> => {
  const userData = getUserData();
  if (!userData) throw new Error("User is not logged in");

  const response = await axios.get(
    `${userData.url}/player_api.php?password=${userData.password}&username=${userData.username}&action=get_vod_info&vod_id=${movieId}`,
  );

  // Check if response is not OK
  if (response.status !== 200) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.data;
};

///Series
export const fetchSeriesCategories = async (): Promise<
  CategoriesResponse[]
> => {
  const userData = getUserData();
  if (!userData) throw new Error("User is not logged in");

  const response = await axios.get(
    `${userData.url}/player_api.php?password=${userData.password}&username=${userData.username}&action=get_series_categories`,
  );
  // Check if response is not OK
  if (response.status !== 200) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.data;
};

export const fetchSeriesChannels = async (
  catyId: string | number,
): Promise<LiveChannelsResponse[]> => {
  const userData = getUserData();
  if (!userData) throw new Error("User is not logged in");

  const response = await axios.get(
    `${userData.url}/player_api.php?password=${userData.password}&username=${userData.username}&action=get_series&category_id=${catyId}`,
  );
  return response.data;
};

export const fetchSerieDetails = async (
  serieId: string,
): Promise<SerieDetails> => {
  const userData = getUserData();
  if (!userData) throw new Error("User is not logged in");

  const response = await axios.get(
    `${userData.url}/player_api.php?password=${userData.password}&username=${userData.username}&action=get_series_info&series_id=${serieId}`,
  );
  // Check if response is not OK
  if (response.status !== 200) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.data;
};
