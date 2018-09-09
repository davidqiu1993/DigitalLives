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
global.detections = [];

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