export type FootprintState = {
  id: string;
  name: string;
  amount: number;
};

export class Footprint {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly amount: number,
  ) {}

  static fromState(state: Footprint['state']) {
    return new Footprint(state.id, state.name, state.amount);
  }

  get state() {
    return {
      id: this.id,
      name: this.name,
      amount: this.amount,
    };
  }
}
