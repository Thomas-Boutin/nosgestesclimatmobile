import {EngineParser, Question} from '../engineParser/engineParser';

describe('engineParser', () => {
  it('it should update the bilan result for logement to 4 when the user answer', () => {
    const defaultDegreesValue = 2;
    const gainsOneDegree = 2;
    const heaterFootprint = 2;
    const inhabitantNumber = 2;

    const expectedResult = 4;

    const result = new EngineParser().getBilanOf(
      'logement . chauffage',
      defaultDegreesValue,
      gainsOneDegree,
      heaterFootprint,
      inhabitantNumber,
    );

    expect(result).toBe(expectedResult);
  });

  it('using the "logement . chauffage . baisse température . nombre degré" should return the correct question', () => {
    const expectedQuestion =
      'De combien de degrés seriez-vous prêt à diminuer la température de votre logement ?';
    const expectIcon = '↘️🌡';
    const expectDescription =
      'Les ¾ de la consommation d’énergie d’un ménage sont consacrés au chauffage et à l’eau chaude.\n\nCette consommation d’énergie, en plus d’avoir un coût financier non négligeable, augmente l’empreinte carbone des ménages.\n\nElle peut toutefois facilement être limitée en diminuant la température des pièces occupées sans perdre de confort thermique ou bien ressentir une sensation de froid (à condition d’avoir des logements bien isolés).\n\nPar exemple, régler la température entre 19° et 21°C dans les pièces occupées la journée (et 17°C la nuit ou dans les pièces peu occupées).\n\nEn effet, baisser la température de chauffage d’1°C représente une économie d’énergie de 7%.\n';
    const expectDefault = 1;
    const expectSuggestedAnswers = {
      '1 degré': 1,
      '2 degrés': 2,
      '3 degrés': 3,
    };

    const question: Question = {
      questionTitle: expectedQuestion,
      icon: expectIcon,
      description: expectDescription,
      defaultValue: expectDefault,
      suggestedAnswers: expectSuggestedAnswers,
    };

    const questionResult = new EngineParser().getQuestion(
      'logement . chauffage . baisse température . nombre degrés',
    );

    expect(questionResult).toEqual(question);
  });
});
