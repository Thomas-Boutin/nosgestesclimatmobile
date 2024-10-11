import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json';

describe('get first question', () => {
  test('should get first question of category', () => {
    expect(getFirstQuestionOf("logement")).toBe(true);
  });
});
