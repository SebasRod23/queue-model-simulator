export interface ObjectWithKeyStr {
  [key: string]: string | number | undefined;
}

export interface InputValues extends ObjectWithKeyStr {
  lambda: string;
  mi: string;
  s: string;
  k: string;
  mean: string;
  sd: string;
}

export interface QueueModelValues {
  lambda?: number;
  mi?: number;
  s?: number;
  k?: number;
  mean?: number;
  sd?: number;
}

export interface QueueData extends ObjectWithKeyStr {
  rho: number;
  l: number;
  lq: number;
  w: number;
  wq: number;
  lambdaE?: number;
  p0: number;
  pk?: number;
}

export interface QueueCostParams extends ObjectWithKeyStr {
  Cw: string;
  Cs: string;
}
