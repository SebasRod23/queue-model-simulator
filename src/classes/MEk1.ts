import { QueueData, QueueModelValues } from '../interfaces/types';

export class MEk1 {
  private static lambda: number;
  private static mi: number;

  private static data: QueueData = {
    rho: 0,
    p0: 0,
    l: 0,
    lq: 0,
    w: 0,
    wq: 0,
  };

  public static simulate = async ({
    lambda,
    mean,
    k,
  }: QueueModelValues): Promise<QueueData> => {
    if (!lambda || !mean || !k)
      return Promise.reject('Parameters are undefined');

    if (lambda <= 0 || mean <= 0 || k <= 0 || lambda >= 1 / mean)
      return Promise.reject('Invalid parameters');

    this.lambda = lambda;
    this.mi = 1 / mean;

    this.data.rho = this.lambda / this.mi;
    this.data.p0 = 1 - this.data.rho;
    this.data.lq =
      ((1 + k) / (2 * k)) *
      (Math.pow(this.lambda, 2) / (this.mi * (this.mi - lambda)));
    this.data.wq = this.data.lq / this.lambda;
    this.data.w = this.data.wq + 1 / this.mi;
    this.data.l = this.lambda * this.data.w;

    return this.data;
  };

  public static generateToPn = async (n: number): Promise<number[]> => {
    if (n <= 0) return Promise.reject('Invalid parameters');
    const pn = [this.data.p0];
    for (let i = 1; i <= n; i++) {
      pn.push(this.data.p0 * Math.pow(this.data.rho, i));
    }
    return pn;
  };

  public static calculateCost = async (
    Cw: number,
    Cs: number,
  ): Promise<number> => {
    if (Cw < 0 || Cs < 0) return Promise.reject('Invalid parameters');
    return this.data.lq * Cw + Cs;
  };
}
