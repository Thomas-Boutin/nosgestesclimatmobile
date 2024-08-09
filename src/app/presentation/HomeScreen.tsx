import {NGCRuleNode} from '@incubateur-ademe/nosgestesclimat';
import rules from '@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json';
import Engine, {EvaluatedNode, PublicodesExpression} from 'publicodes';
import React, {useMemo} from 'react';
import {Button, StyleSheet, Text, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export type NGCEvaluatedNode = EvaluatedNode;

type Rules = typeof rules;
export const safeEvaluateHelper = (
  expr: PublicodesExpression,
  engineUsed: Engine,
): NGCEvaluatedNode | null => {
  let evaluation = null;
  try {
    evaluation = engineUsed.evaluate(expr);
  } catch (error) {
    console.warn(error);
  }
  return evaluation;
};
export type DottedName = string;
export const safeGetRuleHelper = (
  ruleName: DottedName,
  engineUsed: Engine,
): NGCRuleNode | null => {
  let rule = null;
  try {
    rule = engineUsed.getRule(ruleName);
  } catch (error) {
    console.warn(error);
  }
  return rule;
};

export function useEngine(rulesParam: Rules) {
  const engine = useMemo<Engine>(() => {
    const nbRules = Object.keys(rulesParam).length;
    console.log(`⚙️ Parsing ${nbRules}`);
    const engine2 = new Engine(rulesParam, {
      logger: {
        log(msg: string) {
          console.log(`[publicodes:log] ${msg}`);
        },
        warn() {
          return null;
        },
        error(msg: string) {
          console.error(`[publicodes:error] ${msg}`);

          // If it's a situation error, we throw it to sentry
          if (msg.match(/[ Erreur lors de la mise à jour de la situation ]/)) {
            // captureException(new Error(msg));
            console.log(msg);
          }
        },
      },
      strict: {
        situation: false,
        noOrphanRule: false,
      },
    });
    console.log(`⚙️ Parsing ${nbRules} done`);
    return engine2;
  }, [rulesParam]);

  const pristineEngine = useMemo(() => engine.shallowCopy(), [engine]);

  // eslint-disable-next-line no-spaced-func
  const safeEvaluate = useMemo<
    (expr: PublicodesExpression) => NGCEvaluatedNode | null
  >(() => expr => safeEvaluateHelper(expr, engine), [engine]);

  const safeGetRule = useMemo<(ruleName: DottedName) => NGCRuleNode | null>(
    () => (ruleName: DottedName) => safeGetRuleHelper(ruleName, engine),
    [engine],
  );

  return {engine, pristineEngine, safeEvaluate, safeGetRule};
}

export const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const {engine} = useEngine(rules);

  console.log(engine.getRule('alimentation'));
  const boissonChaudeRule = engine.getRule('alimentation . boisson . chaude')
    .rawNode.description;

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {boissonChaudeRule}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      />
      <Button title="Coucoud" onPress={showMessage} />
    </View>
  );
};

const showMessage = () => {
  console.log('coucou');
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
