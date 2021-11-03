import { QueueData } from './QueueData';

export interface Queue {
  lambda: number;
  mi: number;
  s?: number;
  n: number;

  simulate(
    lambda: number,
    mi: number,
    n: number,
    s?: number,
  ): Promise<QueueData>;
}
