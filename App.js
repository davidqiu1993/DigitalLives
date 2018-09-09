import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from './components/TabBarIcon';
import HomeScreen from './Screens/HomeScreen';
import PhotoScreen from './Screens/PhotoScreen';
import PlaygroundScreen from './Screens/PlaygroundScreen';
import D2F from './Screens/D2F';

global.counter = 0;
global.gif_uri = ' ';

/*const HomeStack = createStackNavigator({
  HomeScreen: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PhotoStack = createStackNavigator({
  PhotoScreen: PhotoScreen,
});

PhotoStack.navigationOptions = {
  tabBarLabel: 'Snaps',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const PlaygroundStack = createStackNavigator({
  PlaygroundScreen: PlaygroundScreen,
});

PlaygroundStack.navigationOptions = {
  tabBarLabel: 'Playground',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};
*/

const App = createBottomTabNavigator({
  HomeScreen,
  PhotoScreen,
  PlaygroundScreen,
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});