import { QueueData, QueueModelValues } from '../interfaces/types';

export class MMsk {
  private static lambda: number;
  private static mi: number;
  private static s: number;
  private static k: number;

  private static data: QueueData = {
    rho: 0,
    p0: 0,
    pk: 0,
    l: 0,
    lq: 0,
    w: 0,
    wq: 0,
    lambdaE: 0,
  };

  public static simulate = async ({
    lambda,
    mi,
    s,
    k,
  }: QueueModelValues): Promise<QueueData> => {
    if (!lambda || !mi || !s || !k)
      return Promise.reject('Parameters are undefined');

    if (lambda <= 0 || mi <= 0 || s <= 0 || k <= 0 || s > k || lambda >= s * mi)
      return Promise.reject('Invalid parameters');

    this.lambda = lambda;
    this.mi = mi;
    this.s = s;
    this.k = k;

    this.data.rho = this.lambda / (this.s * this.mi);
    if (isNaN(this.data.rho))
      return Promise.reject('Values are too big/too small to calculate');
    this.data.p0 = this.calculateP0();
    if (isNaN(this.data.p0))
      return Promise.reject('Values are too big/too small to calculate');
    this.data.pk = this.calculatePn(this.k);
    if (isNaN(this.data.pk))
      return Promise.reject('Values are too big/too small to calculate');
    this.data.lq = this.calculateLq();
    if (isNaN(this.data.lq))
      return Promise.reject('Values are too big/too small to calculate');
    this.data.lambdaE = this.lambda * (1 - this.data.pk);
    if (isNaN(this.data.lambdaE))
      return Promise.reject('Values are too big/too small to calculate');
    this.data.wq = this.data.lq / this.data.lambdaE;
    if (isNaN(this.data.wq))
      return Promise.reject('Values are too big/too small to calculate');
    this.data.w = this.data.wq + 1 / this.mi;
    if (isNaN(this.data.w))
      return Promise.reject('Values are too big/too small to calculate');
    this.data.l = this.data.lambdaE * this.data.w;
    if (isNaN(this.data.l))
      return Promise.reject('Values are too big/too small to calculate');

    return this.data;
  };

  private static calculateP0 = (): number => {
    let divisor = 1;
    for (let i = 1; i <= this.s; i++) {
      divisor += Math.pow(this.lambda / this.mi, i) / i!;
    }
    let mult = Math.pow(this.lambda / this.mi, this.s) / this.s!;
    let sum = 0;
    for (let i = this.s + 1; i <= this.k; i++) {
      sum += Math.pow(this.data.rho, i - this.s);
    }
    divisor += mult * sum;

    return 1 / divisor;
  };

  private static calculatePn = (n: number): number => {
    if (n === 0) return this.data.p0;
    if (0 < n && n < this.s) {
      return (Math.pow(this.lambda / this.mi, n) / n!) * this.data.p0;
    } else {
      return (
        (Math.pow(this.lambda / this.mi, n) /
          (Math.pow(this.s, n - this.s) * this.s!)) *
        this.data.p0
      );
    }
  };

  private static calculateLq = (): number => {
    let mult =
      1 -
      Math.pow(this.data.rho, this.k - this.s) -
      (this.k - this.s) *
        Math.pow(this.data.rho, this.k - this.s) *
        (1 - this.data.rho);
    return (
      (mult *
        (this.data.p0 *
          Math.pow(this.lambda / this.mi, this.s) *
          this.data.rho)) /
      (Math.pow(1 - this.data.rho, 2) * this.s!)
    );
  };

  public static generateToPn = async (n: number): Promise<number[]> => {
    if (n <= 0) return Promise.reject('Invalid parameters');
    const pn = [this.data.p0];
    for (let i = 1; i <= n; i++) {
      if (i > this.k) pn.push(0);
      else pn.push(this.calculatePn(i));
    }
    return pn;
  };

  public static calculateCost = async (
    Cw: number,
    Cs: number,
  ): Promise<number> => {
    if (Cw < 0 || Cs < 0) return Promise.reject('Invalid parameters');
    return this.data.lq * Cw + this.s * Cs;
  };
}
