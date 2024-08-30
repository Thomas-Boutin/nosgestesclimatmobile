import {useMachine} from '@xstate/react';
import {EvaluatedNode} from 'publicodes';
import React from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {machine} from './xstate';
export type NGCEvaluatedNode = EvaluatedNode;

export const HomeScreen = () => {
  const [state] = useMachine(machine);
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      {state.context.categories.map(category => (
        <Text
          key={category}
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {category}
        </Text>
      ))}
    </View>
  );
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
