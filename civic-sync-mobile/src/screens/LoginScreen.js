import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../App';

const theme = {
  colors: {
    primary: "#000666",
    onPrimary: "#ffffff",
    surface: "#f9f9f9",
    onSurface: "#1a1c1c",
    outline: "#767683",
    outlineVariant: "#c6c5d4",
  }
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://8c49-2401-4900-883f-b678-ddde-4fd9-f965-210f.ngrok-free.app/api/auth/civilian/login', {
        email,
        password
      });
      
      const { user } = response.data;
      login(user);
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex1}>
        <View style={styles.content}>
          <Text style={styles.icon}>🏦</Text>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Log in to CivicSync to file reports.</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput 
                style={styles.input}
                placeholder="john@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput 
                style={styles.input}
                placeholder="••••••••"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>{isLoading ? 'Logging in...' : 'Log In'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.surface },
  flex1: { flex: 1 },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  icon: { fontSize: 48, marginBottom: 16, textAlign: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.onSurface, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: theme.colors.outline, textAlign: 'center', marginBottom: 32 },
  form: { gap: 16 },
  inputGroup: { gap: 8 },
  label: { fontSize: 14, fontWeight: 'bold', color: theme.colors.onSurface },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: theme.colors.onPrimary, fontWeight: 'bold', fontSize: 16 },
  linkButton: { marginTop: 16, alignItems: 'center' },
  linkText: { color: theme.colors.primary, fontWeight: 'bold', fontSize: 14 }
});
