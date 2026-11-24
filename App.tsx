import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { HomeScreen } from './src/HomeScreen';
import { LoginScreen } from './src/LoginScreen';

// Two screens, no navigation library: if someone is logged in, show Home.
export default function App() {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {email === null ? <LoginScreen onLogin={setEmail} /> : <HomeScreen email={email} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
