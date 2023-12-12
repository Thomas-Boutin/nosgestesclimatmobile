import {
  FootprintList,
  GetFootprintList,
} from '../usecases/footprint-list.query';

export const createFakeGetFootprintList =
  (
    willReturnFootprintList: FootprintList,
    {delay = 0}: {delay?: number} = {},
  ): GetFootprintList =>
  () => {
    return new Promise(resolve => {
      if (delay === 0) {
        resolve(willReturnFootprintList);
        return;
      }
      setTimeout(() => resolve(willReturnFootprintList), delay);
    });
  };
