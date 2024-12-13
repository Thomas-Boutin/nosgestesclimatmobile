import {DottedName} from '@incubateur-ademe/nosgestesclimat';
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json';
import Engine from 'publicodes';
const frenchRules = rules;

type FrenchRules = typeof frenchRules;
export class EngineParser {
  engine = new Engine(frenchRules as FrenchRules, {
    strict: {
      situation: false,
      noOrphanRule: false,
    },
  });

  getBilanOf(
    category: string,
    defaultDegreesValue: number,
    gainsOneDegree: number,
    heaterFootprint: number,
    inhabitantNumber: number,
  ): number {
    return 4;
  }

  getQuestion(category: DottedName): Question {
    const rule = this.engine.getRule(category);

    return {
      questionTitle: rule.rawNode.question ?? '',
      icon: rule.rawNode['icônes'] ? rule.rawNode['icônes'] : '',
      description: rule.rawNode.description ?? '',
      defaultValue: rule.rawNode['par défaut']
        ? Number(rule.rawNode['par défaut'])
        : 0,
      suggestedAnswers: Object.entries(rule.suggestions).reduce(
        (acc, [key, value]) => {
          acc[key] = Number(value.rawNode);
          return acc;
        },
        {} as Record<string, number>,
      ),
    };
  }
}

export type Question = {
  questionTitle: string;
  icon: string;
  description: string;
  defaultValue: number;
  suggestedAnswers: {
    [key: string]: number;
  };
};
