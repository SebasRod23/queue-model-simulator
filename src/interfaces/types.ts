interface objectWithKeyStr {
  [key: string]: string;
}

export interface InputValues extends objectWithKeyStr {
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
