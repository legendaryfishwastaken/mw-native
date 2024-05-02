import { getVidSrcMovieSources } from '@/providers/sources/vidsrc/scrape';
import type { MovieScrapeContext } from '@/utils/context';

export async function scrapeMovie(ctx: MovieScrapeContext) {
  return {
    embeds: await getVidSrcMovieSources(ctx),
  };
}
