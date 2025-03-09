export interface MovieDetails {
  info: Info;
  movie_data: MovieData;
}

interface Info {
  tmdb_id: string;
  name: string;
  o_name: string;
  cover_big: string;
  movie_image: string;
  releasedate: string;
  youtube_trailer: string;
  director: string;
  actors: string;
  cast: string;
  description: string;
  plot: string;
  age: string;
  country: string;
  genre: string;
  backdrop_path: string[];
  duration_secs: number;
  duration: string;
  bitrate: number;
  rating: string;
  status: string;
}

interface MovieData {
  stream_id: number;
  name: string;
  added: string;
  category_id: string;
  category_ids: number[];
  container_extension: string;
  custom_sid: any;
  direct_source: string;
}
