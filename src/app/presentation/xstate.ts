import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json';
import Engine from 'publicodes';
import {assign, setup} from 'xstate';

const frenchRules = rules;
type FrenchRules = typeof frenchRules;
// const engine = new Engine(frenchRules as FrenchRules);

export const machine = setup({
  types: {
    context: {
      engine: Engine as unknown as Engine,
      rule: '',
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgEMAHI-EIrWASwBcqsMyAPRARgCZ0BPN95f5EA */
  id: 'app',
  context: {
    engine: new Engine(frenchRules as FrenchRules, {
      strict: {
        situation: false,
        noOrphanRule: false,
      },
    }),
    rule: '',
  },
  on: {
    'engine.update': {
      actions: assign({
        engine: ({context, event}) =>
          context.engine.setSituation(event.situation),
        rule: '2',
      }),
    },
  },
});
