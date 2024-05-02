import type { MovieMedia, ShowMedia } from '@/entrypoint/utils/media';
import type { UseableFetcher } from '@/fetchers/types';

export interface ScrapeContext {
  proxiedFetcher: UseableFetcher;
  fetcher: UseableFetcher;
  progress(val: number): void;
}

export interface EmbedInput {
  url: string;
}

export type EmbedScrapeContext = EmbedInput & ScrapeContext;

export type MovieScrapeContext = ScrapeContext & {
  media: MovieMedia;
};

export type ShowScrapeContext = ScrapeContext & {
  media: ShowMedia;
};
