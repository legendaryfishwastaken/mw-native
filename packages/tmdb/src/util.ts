import { TMDB } from "tmdb-ts";

const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTlhNmViNDU2ZDliZmMxYWZkMWYyNmU1NzE4ZjA4NCIsInN1YiI6IjYzYzE4NjkzYTU3NDNkMDA3ZDExZGFlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j1a8MCW-xOKcKTNFUCywKszVawlb3nRZwQD_b14A6CA";
export const tmdb = new TMDB(TMDB_API_KEY);

export function getMediaPoster(posterPath: string): string {
  return `https://image.tmdb.org/t/p/w500/${posterPath}`;
}
