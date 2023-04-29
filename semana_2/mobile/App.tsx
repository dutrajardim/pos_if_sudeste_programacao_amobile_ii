import React from 'react';
import { StatusBar } from 'react-native';
import AppStack from './src/routes/AppStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppStack />
      <StatusBar />
    </GestureHandlerRootView>
  );
}