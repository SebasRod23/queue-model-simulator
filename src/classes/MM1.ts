import { Queue } from '../interfaces/Queue';
import { QueueData } from '../interfaces/QueueData';

export const MM1: Queue = class MM1 {
  static lambda: number;
  static mi: number;
  static n: number;

  private static data: QueueData;

  public static simulate = async (
    lambda: number,
    mi: number,
    n: number = 1,
  ): Promise<QueueData> => {
    if (lambda < 0 || mi < 0 || n < 0)
      Promise.reject('All parameters need to be greater than 0');

    this.lambda = lambda;
    this.mi = mi;
    this.n = n;

    this.data.rho = this.lambda / this.mi;
    this.data.p0 = 1 - this.data.rho;
    this.data.pn = this.data.p0 * Math.pow(this.data.rho, this.n);
    this.data.l = this.lambda / (this.mi - this.lambda);
    this.data.lq =
      Math.pow(this.lambda, 2) / (this.mi * (this.mi - this.lambda));
    this.data.w = 1 / (this.mi - this.lambda);
    this.data.wq = this.lambda / (this.mi * (this.mi - this.lambda));

    return this.data;
  };
};

// console.log(MM1.simulate(2, 3, 1));
