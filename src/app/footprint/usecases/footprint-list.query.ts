import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkExtraArg} from '../../store';

export type FootprintState = {
  id: string;
  name: string;
  amount: number;
};

export class FootprintList {
  constructor(
    readonly footprints: {
      id: string;
      name: string;
      amount: number;
    }[],
  ) {}

  get state() {
    return {
      footprints: this.footprints,
    };
  }
}

export type GetFootprintList = {
  (): Promise<FootprintList>;
};

export const getFootprintList = createAsyncThunk<
  FootprintList['state'],
  void,
  {extra: ThunkExtraArg}
>('footprints/getFootprintList', async (_, {extra}) => {
  const productList = await extra.getFootprintList();

  return productList.state;
});
