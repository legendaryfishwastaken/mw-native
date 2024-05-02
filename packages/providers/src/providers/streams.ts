import type { Flags } from '@/entrypoint/utils/targets';
import type { Caption } from '@/providers/captions';

export interface StreamFile {
  type: 'mp4';
  url: string;
}

export type Qualities = 'unknown' | '360' | '480' | '720' | '1080' | '4k';

interface ThumbnailTrack {
  type: 'vtt';
  url: string;
}

interface StreamCommon {
  id: string; // only unique per output
  flags: Flags[];
  captions: Caption[];
  thumbnailTrack?: ThumbnailTrack;
  headers?: Record<string, string>; // these headers HAVE to be set to watch the stream
  preferredHeaders?: Record<string, string>; // these headers are optional, would improve the stream
}

export type FileBasedStream = StreamCommon & {
  type: 'file';
  qualities: Partial<Record<Qualities, StreamFile>>;
};

export type HlsBasedStream = StreamCommon & {
  type: 'hls';
  playlist: string;
};

export type Stream = FileBasedStream | HlsBasedStream;
