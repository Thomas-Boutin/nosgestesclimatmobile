import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json';
import Engine from 'publicodes';
import {assign, setup} from 'xstate';

const frenchRules = rules;
type FrenchRules = typeof frenchRules;
// const engine = new Engine(frenchRules as FrenchRules);

type Events = {
  type: 'userAnswer';
  answer: object;
};
// . {'alimentation . boisson . chaude': 5}

export const machine = setup({
  types: {
    context: {
      engine: Engine as unknown as Engine,
      rule: '',
    },
    events: {} as Events,
  },
  actions: {
    updateEngine: assign({
      engine: ({context, event}) => context.engine.setSituation(event.answer),
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0ECWtUBtkBPARQFc4AXbAewDsBiM2MAJwEE7YB3NgbQAMAXUShUNWNmr1RIAB6IAtAEYAnMowBmAQIDsADmUAmAKwAaEEUTKBJjMt3L9ukwF93FujQhxZaVLLiktJ0sgoIiqb6GAL6RgKaxuaWSsrKmhhxhqYeIP5YuATE5FS0oUggQVJlYamqGbGq+gAsmi4WVhFGAGxaRtlurhb5OHiERAByYHKUJbAhgRLVMhXhkTYxcQlJHYj9vc76qgLdOe6uQA */
  id: 'app',
  initial: 'displayQuestion',

  context: {
    engine: new Engine(frenchRules as FrenchRules, {
      strict: {
        situation: false,
        noOrphanRule: false,
      },
    }),
    rule: '',
  },

  states: {
    displayQuestion: {
      on: {
        userAnswer: {
          target: 'displayNextQuestion',
          actions: 'updateEngine',
        },
      },
    },

    displayNextQuestion: {},
  },
});
