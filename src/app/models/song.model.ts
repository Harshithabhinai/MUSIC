export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;    // display format mm:ss, e.g. "3:45"
  durationSec: number; // total duration in seconds (used for progress calc)
  cover: string;        // album art URL
  audioSrc: string;     // playable audio URL
  genre: string;
  isLiked: boolean;
}
