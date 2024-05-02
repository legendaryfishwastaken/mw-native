interface Data {
  id: string;
  audio: string;
  mixdropStatus: string;
  fembedStatus: string;
  streamtapeStatus: string;
  warezcdnStatus: string;
}

type List = Record<string, Data>;

export interface SerieAjaxResponse {
  list: List;
}
