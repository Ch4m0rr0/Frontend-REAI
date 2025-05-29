import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const API_BASE_URL = "http://192.168.0.7:3000";
const DEMO_USER = "demo@example.com";
const DEMO_PASS = "demo123";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const token = response.data.access_token;
      if (token) {
        await login(token);
        navigation.replace("Home");
        return;
      }
    } catch (error) {
      console.warn("Fallo conexión:", error.message);
    }

    if (email === DEMO_USER && password === DEMO_PASS) {
      await login("demo_token");
      navigation.replace("Home");
    } else {
      Alert.alert("Error", "Credenciales incorrectas o error en la conexión");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020D19",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    color: "#fff",
    marginBottom: 30,
    fontWeight: "bold",
  },
  input: {
    width: width * 0.8,
    backgroundColor: "#1A1A2E",
    padding: 15,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00D8FF",
    width: width * 0.8,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default LoginScreen;
