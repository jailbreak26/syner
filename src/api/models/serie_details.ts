// Define the interface for episode information
interface EpisodeInfo {
  id: number;
  duration_secs: number;
  duration: string;
  bitrate: number;
}

// Define the interface for a single episode
interface Episode {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: EpisodeInfo;
  custom_sid: string | null;
  added: string;
  season: number;
  direct_source: string;
}

// Define the interface for the episodes collection
interface Episodes {
  [seasonNumber: string]: Episode[];
}

// Define the interface for the SerieDetails
export interface SerieDetails {
  info: Info;
  episodes: Episodes;
}

// Define the interface for additional information about the series
interface Info {
  name: string;
  cover: string;
  plot: string;
  cast: string;
  director: string;
  genre: string;
  releaseDate: string;
  last_modified: string;
  rating: string;
  rating_5based: string;
  backdrop_path: string[];
  tmdb: string;
  youtube_trailer: string;
  episode_run_time: string;
  category_id: string;
  category_ids: number[];
}
