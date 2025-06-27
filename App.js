import { SafeAreaProvider } from 'react-native-safe-area-context';
import TrailDiscoveryApp from './App/TrailDiscoveryApp';

export default function App() {
  return (
    <SafeAreaProvider>
      <TrailDiscoveryApp />
    </SafeAreaProvider>
  );
}
