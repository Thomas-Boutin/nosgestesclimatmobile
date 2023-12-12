import {FootprintState, Footprint} from './footprint';

export type FootprintListState = FootprintState[];

export class FootprintList {
  constructor(private readonly items: Map<string, Footprint>) {}

  static fromState(state: FootprintListState) {
    const footprints = state.map(Footprint.fromState);

    return new FootprintList(new Map(footprints.map(i => [i.id, i])));
  }

  get state(): FootprintListState {
    return [...this.items.values()].map(i => i.state);
  }

  addFootprint(footprint: Footprint) {
    this.items.set(footprint.id, footprint);
  }
}
