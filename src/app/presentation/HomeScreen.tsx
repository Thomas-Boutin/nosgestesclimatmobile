import {EvaluatedNode} from 'publicodes';
import React from 'react';
import {Button, StyleSheet, Text, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {machine} from './xstate';
import {useMachine} from '@xstate/react';
export type NGCEvaluatedNode = EvaluatedNode;

export const HomeScreen = () => {
  const [state, send] = useMachine(machine);
  const isDarkMode = useColorScheme() === 'dark';

  const boissonChaudeRule = state.context.engine.getRule(
    'alimentation . boisson . chaude',
  ).rawNode.description;

  console.log('state', state);

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {boissonChaudeRule}
      </Text>
      <Button title="Coucoud" onPress={showMessage} />
      <Button
        title="Test state"
        onPress={() =>
          send({
            type: 'engine.update',
            situation: {'alimentation . boisson . chaude': 5},
          })
        }
      />
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
