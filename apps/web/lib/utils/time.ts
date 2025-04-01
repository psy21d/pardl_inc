/* 
  psy21d 
  Apche 2.0 licensed
*/
export class Seconds {
  constructor(private readonly value: number) {}

  toMs(): number {
    return this.value * 1000;
  }
}

export function secs(value: number): Seconds {
  return new Seconds(value);
}
