export type Track = {
  id: SpotifyApi.TrackObjectFull["id"];
  name: SpotifyApi.TrackObjectFull["name"];
  track_url: SpotifyApi.TrackObjectFull["external_urls"]["spotify"];
  preview_url: SpotifyApi.TrackObjectFull["preview_url"];
  artists: {
    name: string;
    artist_url: string;
  }[];
};
