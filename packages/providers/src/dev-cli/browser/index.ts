import { makeProviders } from "@/entrypoint/declare";
import { targets } from "@/entrypoint/utils/targets";
import { makeSimpleProxyFetcher } from "@/fetchers/simpleProxy";
import { makeStandardFetcher } from "@/fetchers/standardFetch";

(window as any).scrape = (proxyUrl: string, type: 'source' | 'embed', input: any) => {
  const providers = makeProviders({
    fetcher: makeStandardFetcher(fetch),
    target: targets.BROWSER,
    proxiedFetcher: makeSimpleProxyFetcher(proxyUrl, fetch),
  });
  if (type === 'source') {
    return providers.runSourceScraper(input);
  }
  if (type === 'embed') {
    return providers.runEmbedScraper(input);
  }

  throw new Error('Input input type');
};
