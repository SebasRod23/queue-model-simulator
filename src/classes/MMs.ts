import { QueueData } from '../interfaces/QueueData';

export class MMs {
  private static lambda: number;
  private static mi: number;
  private static s: number;

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
    s: number,
  ): Promise<QueueData> => {
    if (lambda <= 0 || mi <= 0 || s <= 0 || lambda >= s * mi)
      Promise.reject('Parameters not valid');

    this.lambda = lambda;
    this.mi = mi;
    this.s = s;

    this.data.rho = this.lambda / (this.s * this.mi);
    this.data.p0 = this.calculateP0();
    this.data.lq =
      (this.data.p0 * Math.pow(this.lambda / mi, this.s) * this.data.rho) /
      (this.s! * Math.pow(1 - this.data.rho, 2));
    this.data.l = this.data.lq + this.lambda / this.mi;
    this.data.wq = this.data.lq / this.lambda;
    this.data.w = this.data.wq + 1 / this.mi;

    return this.data;
  };

  private static calculateP0 = (): number => {
    let divisor = 1;
    for (let i = 1; i < this.s; i++) {
      divisor += Math.pow(this.lambda / this.mi, i) / i!;
    }
    divisor +=
      (Math.pow(this.lambda / this.mi, this.s) / this.s!) *
      (1 / (1 - this.data.rho));
    return 1 / divisor;
  };

  private static calculatePn = (n: number): number => {
    if (0 <= n && n < this.s) {
      return (Math.pow(this.lambda / this.mi, n) / n!) * this.data.p0;
    } else {
      return (
        (Math.pow(this.lambda / this.mi, n) /
          (Math.pow(this.s, n - this.s) * this.s!)) *
        this.data.p0
      );
    }
  };

  public static generateToPn = async (n: number): Promise<number[]> => {
    if (n <= 0) Promise.reject('Parameters not valid');
    const pn = [this.data.p0];
    for (let i = 1; i <= n; i++) {
      pn.push(this.calculatePn(i));
    }
    return pn;
  };

  public static calculateCost = async (
    Cw: number,
    Cs: number,
  ): Promise<number> => {
    if (Cw < 0 || Cs < 0) Promise.reject('Parameters not valid');
    return this.data.lq * Cw + this.s * Cs;
  };
}
