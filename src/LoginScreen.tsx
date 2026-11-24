import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { validateLogin } from './validation';

type Props = {
  onLogin: (email: string) => void;
};

export function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    const message = validateLogin(email, password);
    setError(message);
    if (message === null) {
      onLogin(email.trim());
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} role="heading">
        Log in
      </Text>

      <TextInput
        testID="email-input"
        aria-label="Email"
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        testID="password-input"
        aria-label="Password"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {error !== null && (
        <Text testID="login-error" role="alert" style={styles.error}>
          {error}
        </Text>
      )}

      <Pressable testID="login-button" role="button" onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#888', borderRadius: 8, padding: 12, fontSize: 18 },
  error: { color: '#B00020', fontSize: 16 },
  button: { backgroundColor: '#1F5BA8', borderRadius: 8, padding: 14, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
