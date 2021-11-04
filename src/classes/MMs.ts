import { QueueData } from '../interfaces/QueueData';

export class MMs {
  static lambda: number;
  static mi: number;
  static s: number;
  static n: number;

  private static data: QueueData = {
    rho: 0,
    pn: 0,
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
    n: number,
  ): Promise<QueueData> => {
    if (lambda < 0 || mi < 0 || s < 0 || n <= 0)
      Promise.reject('Parameters not valid');

    this.lambda = lambda;
    this.mi = mi;
    this.s = s;
    this.n = n;

    this.data.rho = this.lambda / (this.s * this.mi);
    this.data.p0 = this.calculateP0();
    this.data.pn = this.calculatePn();
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

  private static calculatePn = (): number => {
    if (0 <= this.n && this.n < this.s) {
      return (Math.pow(this.lambda / this.mi, this.n) / this.n!) * this.data.p0;
    } else {
      return (
        (Math.pow(this.lambda / this.mi, this.n) /
          (Math.pow(this.s, this.n - this.s) * this.s!)) *
        this.data.p0
      );
    }
  };
}
