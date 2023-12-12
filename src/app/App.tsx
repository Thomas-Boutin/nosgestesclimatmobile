/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {createFakeGetFootprintList} from './footprint/infrastructure/fake-get-footprint-list';
import {createStore} from './store';
import {FootprintList} from './footprint/usecases/footprint-list.query';
import {Footprint} from './footprint/domain/footprint';
import {HomeScreen} from './presentation/HomeScreen';

const Tab = createBottomTabNavigator();

const mustard = Footprint.fromState({
  id: 'id1',
  name: 'mustard',
  amount: 2.5,
});
const ketchup = Footprint.fromState({
  id: 'id2',
  name: 'ketchup',
  amount: 2.5,
});

const productList = new FootprintList([
  {
    ...mustard.state,
  },
  {
    ...ketchup.state,
  },
]);

const store = createStore({
  getFootprintList: createFakeGetFootprintList(productList, {delay: 1000}),
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
