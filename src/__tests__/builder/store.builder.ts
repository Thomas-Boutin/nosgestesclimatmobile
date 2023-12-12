import {createFakeGetFootprintList} from '../../app/footprint/infrastructure/fake-get-footprint-list';
import {
  GetFootprintList,
  FootprintList,
} from '../../app/footprint/usecases/footprint-list.query';
import {
  createStore,
  rootReducer,
  RootState,
  ThunkExtraArg,
} from '../../app/store';

export const storeBuilder = (
  state: RootState = rootReducer(undefined, {type: ''}),
  {
    getFootprintList = createFakeGetFootprintList(new FootprintList([])),
  }: Partial<ThunkExtraArg> = {},
) => {
  const storeDependencies = {getFootprintList};

  return {
    withGetFootprintList(_getFootprintList: GetFootprintList) {
      return storeBuilder(state, {
        ...storeDependencies,
        getFootprintList: _getFootprintList,
      });
    },
    build() {
      return createStore({
        preloadedState: state,
        getFootprintList,
      });
    },
  };
};
