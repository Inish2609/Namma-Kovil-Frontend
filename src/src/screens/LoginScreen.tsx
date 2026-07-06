import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { handleLogin } from '../services/service';

export default function LoginScreen() {

  const [phoneNumber, setPhoneNumber] = useState('')

  const [password, setPassword] = useState('')

  async function handleSubmit() {
    try {
      const response = await handleLogin(phoneNumber, password)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <LinearGradient
      colors={['#FFF8F3', '#FDEFE5', '#FFF5EE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/image-2.jpeg')}
            style={styles.image}
            resizeMode="cover"
          />

          <LinearGradient
            colors={['transparent', '#FFF8F3']}
            style={styles.bottomFade}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.templeName}>Sri Mutharaman Temple</Text>

          <Text style={styles.subtitle}>Welcome Back</Text>

          <TextInput
            placeholder="Mobile Number"
            style={styles.input}
            keyboardType="phone-pad"
            value={phoneNumber ?? ''}
            onChangeText={(value) => setPhoneNumber(value)}
          />

          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />

          <TouchableOpacity style={styles.loginButton} onPress={() => handleSubmit()}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
  },

  imageContainer: {
    height: '45%',
    width: '100%',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  bottomFade: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%',
  },

  formContainer: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: -20,
  },

  templeName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D97706',
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
    marginBottom: 30,
    fontSize: 16,
  },

  input: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 18,
    height: 55,
    marginBottom: 15,
    elevation: 3,
  },

  loginButton: {
    backgroundColor: '#F97316',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  loginText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },

  guestText: {
    textAlign: 'center',
    color: '#D97706',
    marginTop: 20,
    fontWeight: '600',
  },
});
