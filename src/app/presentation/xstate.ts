import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json';
import Engine from 'publicodes';
import {setup} from 'xstate';

const frenchRules = rules;
type FrenchRules = typeof frenchRules;
// const engine = new Engine(frenchRules as FrenchRules);

type Events = {
  type: 'userAnswer';
  answer: object;
};

type Context = {
  engine: Engine;
  categories: string[];
};

// . {'alimentation . boisson . chaude': 5}

export const machine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
  actions: {},
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0BLAdlgLgMQDaADALqKioD2sBWNOVIAHogLQDMpXGATAA4uARgBsI3lwCcAdlJiANCACenfkIylZ-AKwKuAFl5jZu2QF8rynDQhwWaVC1r18jZkjadDu3RiMFMUMRfm1DWWU1BG5zDFlBUK5ZaUldMV1pXWsQJ2w8fBc6BiYWdhjjWQDjMWDQ8MjVdTFpDEFa-h5+MW1SaS4xHLyAESxYVAAbZBUAYWR8MCgaACcsBy9XEs9Qcu5DPkFOkSMU6W0sqM5JVsFM9MqZM8FBKysgA */
  id: 'app',
  initial: 'init',

  context: {
    engine: new Engine(frenchRules as FrenchRules, {
      strict: {
        situation: false,
        noOrphanRule: false,
      },
    }),
    categories: [
      'transport',
      'alimentation',
      'logement',
      'divers',
      'services sociétaux',
    ],
  },

  states: {
    init: {
      always: 'DisplayCategories',
    },

    DisplayCategories: {},
  },
});
