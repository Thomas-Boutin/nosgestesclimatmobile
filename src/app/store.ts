import {
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
} from '@reduxjs/toolkit';
import {GetFootprintList} from './footprint/usecases/footprint-list.query';
import {footprintSlice} from './footprint/usecases/footprint.slice';

export type ThunkExtraArg = {
  getFootprintList: GetFootprintList;
};

export const rootReducer = combineReducers({
  [footprintSlice.name]: footprintSlice.reducer,
});

export const createStore = ({
  preloadedState,
  getFootprintList,
}: {
  preloadedState?: ConfigureStoreOptions['preloadedState'];
} & ThunkExtraArg) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: {
            getFootprintList,
          },
        },
      });
    },
    preloadedState,
  });

  return store;
};

export type AppStore = ReturnType<typeof createStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
