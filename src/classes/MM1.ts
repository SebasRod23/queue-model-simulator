import { QueueData } from '../interfaces/QueueData';

export class MM1 {
  static lambda: number;
  static mi: number;
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
    n: number,
  ): Promise<QueueData> => {
    if (lambda < 0 || mi < 0 || n <= 0) Promise.reject('Parameters not valid');

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
}
