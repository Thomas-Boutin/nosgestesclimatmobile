import {useMachine} from '@xstate/react';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {machine} from './xstate';

export const HomeScreen = () => {
  const [state, send] = useMachine(machine);

  function onUserSelectCategory(category: string): void {
    send({type: 'User selects a category', category});
  }

  return (
    <View style={styles.sectionContainer}>
      <Text>{state.context.currentCategory}</Text>
      <Text>{state.context.currentQuestion}</Text>
      {state.context.categories.map(category => (
        <Button
          key={category}
          title={category}
          onPress={() => onUserSelectCategory(category)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
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
