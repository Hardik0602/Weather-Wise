import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppScreen from './src/AppScreen';
import AppScreenApi from './src/AppScreenApi';
function App() {
  return (
    <SafeAreaProvider>
      {/* <AppScreen /> */}
      <AppScreenApi />
    </SafeAreaProvider>
  );
}
export default App;