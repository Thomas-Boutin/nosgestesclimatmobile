import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {
  getFootprintList,
  FootprintList,
  FootprintState,
} from './footprint-list.query';

export const footprintsAdapter = createEntityAdapter<FootprintState>();

export const footprintSlice = createSlice({
  name: 'footprints',
  initialState: footprintsAdapter.getInitialState({
    loading: false,
  }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getFootprintList.pending, state => {
      state.loading = true;
    });
    builder.addCase(getFootprintList.fulfilled, (state, action) => {
      state.loading = false;
      footprintsAdapter.addMany(state, action.payload.footprints);
    });
  },
});

const createSelector =
  <T>(selector: (sliceState: RootState[typeof footprintSlice['name']]) => T) =>
  (state: RootState) =>
    selector(state[footprintSlice.name]);

export const selectIsFootprintListLoading = createSelector(
  sliceState => sliceState.loading,
);

export const selectFootprintList = createSelector(
  sliceState =>
    new FootprintList(footprintsAdapter.getSelectors().selectAll(sliceState)),
);

export const createSelectFootprintById = (footprintId: string) =>
  createSelector(sliceState =>
    footprintsAdapter.getSelectors().selectById(sliceState, footprintId),
  );
