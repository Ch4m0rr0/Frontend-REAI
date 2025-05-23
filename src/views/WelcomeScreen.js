import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image source={require('../assets/Isotipe.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.textLogo}>RE <Text style={styles.textBlue}>AI</Text></Text>
      </View>

      {/* Botones existentes */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerText}>Registrarse</Text>
      </TouchableOpacity>

      {/* Botón para ir directo al Home */}
      {/* <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeButtonText}>Ir al Home (prueba)</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020D19',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textLogo: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  textBlue: {
    color: '#0095FF',
  },
  loginButton: {
    backgroundColor: '#3B3B4F',
    paddingVertical: 14,
    width: width * 0.8,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#00D8FF',
    paddingVertical: 14,
    width: width * 0.8,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    width: width * 0.8,
    borderRadius: 30,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default WelcomeScreen;
