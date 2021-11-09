import { QueueData } from '../interfaces/QueueData';

export class MG1 {
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
    mean: number,
    sd: number,
  ): Promise<QueueData> => {
    if (lambda <= 0 || mean <= 0 || sd < 0 || lambda >= 1 / mean)
      return Promise.reject('Parameters not valid');

    this.lambda = lambda;
    this.mi = 1 / mean;

    this.data.rho = this.lambda / this.mi;
    this.data.p0 = 1 - this.data.rho;
    this.data.lq =
      (Math.pow(this.lambda * sd, 2) + Math.pow(this.data.rho, 2)) /
      (2 * (1 - this.data.rho));
    this.data.l = this.data.rho + this.data.lq;
    this.data.wq = this.data.lq / this.lambda;
    this.data.w = this.data.wq + 1 / this.mi;

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
