import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json';
import Engine from 'publicodes';
import {assign, setup} from 'xstate';

const frenchRules = rules;
type FrenchRules = typeof frenchRules;
// const engine = new Engine(frenchRules as FrenchRules);

type Events = {
  type: 'onUserSelectCategory';
  category: string;
};

type Context = {
  engine: Engine;
  categories: string[];
  currentCategory: string | undefined;
};

// . {'alimentation . boisson . chaude': 5}

export const machine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0BLAdlgLgMQDaADALqKioD2sBWNOVIAHogLQDMATAIwYArD0FcxAFlIAOPjwBs4gOwAaEAE9OfGRiVTxAThm9FXUrwC+51WkwARLLFQAbZGoDCyfGCg0ATljhCJgBVWDBfAGUwJzAAY3wPLx9fNTJKJBBaenxGZgz2BG5FUgwpPR5FHn0lHkk+OVUNBDkeDC4pfj4DPjEpRSVLKxAcGgg4FhsWLIYmFgKOUQEDOVN+HlN+nkbOdsUMUi0zerlSOS6+S2t0bDx8KboZvNB58SkuHX0V0jWN8S7twpVfQYPhmb51UiKQRQy4gGwYeyOFzuTzePwBeAZaY5Wb5HbFIR8fSkQw8DriM5SAEcUGtLj6LiLHjSJSQniw+GI5yuABiWF8sHwAEUAK5wHFPTIPCVzHYtNqKfRknr1IH9AHrAQM0iCBSkV5SYn6C6DIA */
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
    currentCategory: undefined,
  },

  states: {
    init: {
      always: 'DisplayCategories',
    },

    DisplayCategories: {
      on: {
        onUserSelectCategory: {
          target: 'DisplayFirstQuestion',
          actions: assign({
            currentCategory: ({event}) => event.category,
          }),
        },
      },
    },

    DisplayFirstQuestion: {},
  },
});
