export interface ObjectWithKeyStr {
  [key: string]: string | number | undefined;
}

export interface InputValues extends ObjectWithKeyStr {
  lambda: string;
  mi: string;
  s: string;
  k: string;
  n: string;
}

export interface GeneratorValues {
  lambda: number;
  mi: number;
  s: number;
  k: number;
  n: number;
}

export interface QueueData extends ObjectWithKeyStr {
  rho: number;
  l: number;
  lq: number;
  w: number;
  wq: number;
  pn: string;
  lambdaE?: number;
}
