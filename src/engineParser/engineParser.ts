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
    return (
      defaultDegreesValue + gainsOneDegree + heaterFootprint + inhabitantNumber
    );
  }

  getQuestion(category: string): Question {
    return this.engine.getRule(category);
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
