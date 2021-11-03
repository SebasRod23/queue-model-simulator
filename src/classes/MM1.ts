import { QueueData } from '../interfaces/QueueData';

export class MM1 {
  public static simulate = async (
    lambda: number,
    mi: number,
    n: number = 1,
  ): Promise<QueueData> => {
    const rho = lambda / mi;
    const p0 = 1 - rho;
    const pn = p0 * Math.pow(rho, n);
    const l = lambda / (mi - lambda);
    const lq = Math.pow(lambda, 2) / (mi * (mi - lambda));
    const w = 1 / (mi - lambda);
    const wq = lambda / (mi * (mi - lambda));

    const data: QueueData = {
      rho,
      p0,
      pn,
      l,
      lq,
      w,
      wq,
    };

    return data;
  };
}
