import { QueueData } from '../interfaces/QueueData';

export class MM1 {
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

  public static simulate = async (
    lambda: number,
    mi: number,
  ): Promise<QueueData> => {
    if (lambda <= 0 || mi <= 0 || lambda >= mi)
      return Promise.reject('Parameters not valid');

    this.lambda = lambda;
    this.mi = mi;

    this.data.rho = this.lambda / this.mi;
    this.data.p0 = 1 - this.data.rho;
    this.data.l = this.lambda / (this.mi - this.lambda);
    this.data.lq =
      Math.pow(this.lambda, 2) / (this.mi * (this.mi - this.lambda));
    this.data.w = this.data.l / this.lambda;
    this.data.wq = this.data.lq / this.lambda;

    return this.data;
  };

  public static generateToPn = async (n: number): Promise<number[]> => {
    if (n <= 0) return Promise.reject('Parameters not valid');
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
    if (Cw < 0 || Cs < 0) return Promise.reject('Parameters not valid');
    return this.data.lq * Cw + Cs;
  };
}
