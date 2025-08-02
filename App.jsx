import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppScreen from './src/AppScreen';
function App() {
  return (
    <SafeAreaProvider>
      <AppScreen />
    </SafeAreaProvider>
  );
}
export default App;