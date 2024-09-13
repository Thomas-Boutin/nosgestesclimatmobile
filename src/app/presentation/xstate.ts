import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json';
import Engine from 'publicodes';
import {assign, setup} from 'xstate';

const frenchRules = rules;
type FrenchRules = typeof frenchRules;

type Events =
  | {
      type: 'User selects a category';
      category: string;
    }
  | {
      type: 'User answers question';
      answer: string;
    };

type Context = {
  engine: Engine;
  categories: string[];
  currentCategory: string | undefined;
  currentQuestion: string | undefined;
};

const getFirstQuestion = (_category: string, _engine: Engine) => {
  return 'Lalala';
};

export const machine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
  actions: {
    onUserSelectCategory: assign({
      currentCategory: ({}, category: string) => category,
    }),
    'Load First Question': assign({
      currentQuestion: ({context}) => {
        if (!context.currentCategory) {
          throw new Error('No category selected');
        }

        return getFirstQuestion(context.currentCategory, context.engine);
      },
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0BLAdlgLgMQDaADALqKioD2sBWNOVIAHogLQDMAHAOwYATINIA2AKyCALAE4uXYYIA0IAJ6cAjHxlDxGueNGieGkeJ4BfCyrSYAwsnxgoNAE5Y4AESyxUAG2RVSEIAVVgwVwACcL8wAGN8WEjkSLjHZzdVMkokEFp6fEZmXPYEDi1SDC4pPh5RGpkNHkEZHi4VdTLTHgw2kz5SNo1ZPilxK2sQHBoIOBZbFnyGJhZSjkMpDCljLRFBDS5RLj4Ozl5RDH0RHh4ZKVMNYasbdGw8fEW6ZeLQNb0L7b9PYHI4nNScFo9PQDOqSUikAZ8LjPEC2DAOJwudxeHz+QKQT4FIqrTg1Sr1fjNQSItpSKSnMrVDCScR8LSsqSkcT-FFojEZbGwby+AJBCAYTwASQAygAFAAyAEEAJoAfQAiiEAKLSgAqkoA8gA5QnfEllKT7KpI2oIiQVDQM8RcS6yQQ8KQemHcjS8178rEeIW40WQCUyhUq1VGrUADV1Gu1esNJtyS0KKxKpOEGAptWENOq9PBCC4hku+0EXCaMj4okEol9EyAA */
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
    currentQuestion: undefined,
  },

  states: {
    init: {
      always: 'CategoriesDisplayed',
    },

    CategoriesDisplayed: {
      initial: 'DISPLAY_QUESTION',
      on: {
        'User selects a category': [
          {
            target: 'CategoriesDisplayed',
            actions: [
              {
                type: 'onUserSelectCategory',
                params: ({event}) => event.category,
              },
            ],
          },
        ],
      },

      states: {
        DISPLAY_QUESTION: {
          entry: 'Load First Question',
        },

        DISPLAY_NEXT_QUESTION: {},
      },
    },
  },
});
