import {createFakeGetFootprintList} from '../app/footprint/infrastructure/fake-get-footprint-list';
import {
  getFootprintList,
  FootprintList,
} from '../app/footprint/usecases/footprint-list.query';
import {selectFootprintList} from '../app/footprint/usecases/footprint.slice';
import {AppStore} from '../app/store';
import {storeBuilder} from './builder/store.builder';

describe('Feature: Retrieving footprint list', () => {
  let sut: Sut;

  beforeEach(() => {
    sut = createSut();
  });

  test('Footprints contains name, amount and unit', async () => {
    sut.givenFollowingFootprintList([
      {
        id: 'id1',
        amount: 2.5,
        name: 'Mustard',
      },
      {
        id: 'id2',
        amount: 2,
        name: 'Ketchup',
      },
    ]);

    await sut.whenRetrievingFootprintList();

    sut.thenFootprintListShouldBe([
      {
        id: 'id1',
        amount: 2.5,
        name: 'Mustard',
      },
      {
        id: 'id2',
        amount: 2,
        name: 'Ketchup',
      },
    ]);
  });
});

const createSut = () => {
  let store: AppStore;

  return {
    givenFollowingFootprintList(
      footprintList: {
        id: string;
        name: string;
        amount: number;
      }[],
    ) {
      const fakeGetFootprintList = createFakeGetFootprintList(
        new FootprintList(footprintList),
      );
      store = storeBuilder().withGetFootprintList(fakeGetFootprintList).build();
    },
    async whenRetrievingFootprintList() {
      return store.dispatch(getFootprintList());
    },
    thenFootprintListShouldBe(
      expectedFootprintList: {
        id: string;
        name: string;
        amount: number;
      }[],
    ) {
      const retrievedFootprintList = selectFootprintList(store.getState());
      expect(retrievedFootprintList).toEqual(
        new FootprintList(expectedFootprintList),
      );
    },
  };
};

type Sut = ReturnType<typeof createSut>;
