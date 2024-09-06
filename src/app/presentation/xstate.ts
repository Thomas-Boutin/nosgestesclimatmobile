import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json';
import Engine from 'publicodes';
import {assign, setup} from 'xstate';

const frenchRules = rules;
type FrenchRules = typeof frenchRules;
// const engine = new Engine(frenchRules as FrenchRules);

type Events = {
  type: 'User selects a category';
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
  actions: {
    onUserSelectCategory: assign({
      currentCategory: ({event}) => event.category,
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0BLAdlgLgMQDaADALqKioD2sBWNOVIAHogLQDMATAIwYArD0FcxAFlIAOPjwBs4gOwAaEAE9OfGRiVTxAThm9FXUrwC+51WkwARLLFQAbZGoDCyfGCg0ATljhCJgBVWDBfAGUwJzAAY3wPLx9fNTJKJBBaenxGZgz2BG5FUgwpPR5FHn0lHkk+OVUNBDkeDC4pfj4DPjEpRSVLKxAcGgg4FhsWLIYmFgKOUQEDOVN+HlN+nkbOdrkMOTND2TkpLjk5S2t0bDx8KboZvNB58VOdfRXSNY3xLu3Cqr6DB8Q61UggxSCSGXEA2DD2Rwudyebx+ALwDLTHKzfI7YpCPj6UiGHgdcRyLT-Dgg1pcfRcRY8aRKUiVGFwhHOVwAMSwvlg+AAigBXODYp6ZB7iuY7FptRT6Uk9eqA-r-dYCemkQQKUivKRE-R8QbmIA */
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
    currentCategory: 'transport',
  },

  states: {
    init: {
      always: 'CategoriesDisplayed',
    },
    CategoriesDisplayed: {
      on: {
        'User selects a category': [
          {
            target: 'DisplayFirstQuestion',
            actions: ['onUserSelectCategory'],
          },
        ],
      },
    },

    DisplayFirstQuestion: {},
  },
});
