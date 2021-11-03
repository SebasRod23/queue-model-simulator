import { Queue } from '../interfaces/Queue';
import { QueueData } from '../interfaces/QueueData';

export const MMs: Queue = class MMs {
  static lambda: number;
  static mi: number;
  static s: number;
  static n: number;

  private static data: QueueData;

  public static simulate = async (
    lambda: number,
    mi: number,
    n: number = 1,
    s: number,
  ): Promise<QueueData> => {
    if (lambda < 0 || mi < 0 || s < 0 || n < 0)
      Promise.reject('All parameters need to be greater than 0');

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
    let divisor = 0;
    for (let i = 0; i < this.s - 1; i++) {
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
};
