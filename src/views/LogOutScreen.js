import React, { useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

const LogOutScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const [name, setName] = useState("Jeremaya San John");
  const [photo, setPhoto] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadUserData = async () => {
        try {
          const storedName = await AsyncStorage.getItem("userName");
          const storedPhoto = await AsyncStorage.getItem("userPhoto");
          if (storedName) {
            setName(storedName);
            console.log("Nombre cargado:", storedName);
          }
          if (storedPhoto) {
            setPhoto(storedPhoto);
            console.log("Foto cargada:", storedPhoto);
          }
        } catch (err) {
          console.error("Error loading user data:", err);
        }
      };

      loadUserData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Flecha */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Perfil */}
      <View style={styles.profileBox}>
        <Image
          source={{
            uri:
              photo ||
              "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{name}</Text>
        <Ionicons name="chevron-down" size={18} color="#fff" />
      </View>

      {/* Opciones */}
      <View style={styles.optionBox}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate("Drafts")}
        >
          <Ionicons name="bookmark-outline" size={18} color="#fff" />
          <Text style={styles.optionText}>Guardado</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="help-circle-outline" size={18} color="#fff" />
          <Text style={styles.optionText}>Ayuda y Soporte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="lock-closed-outline" size={18} color="#fff" />
          <Text style={styles.optionText}>Configuración y Privacidad</Text>
        </TouchableOpacity>
      </View>

      {/* Cerrar sesión */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image
        source={require("../assets/Isotipe.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020D19",
    padding: 20,
    paddingTop: 40,
    position: "relative",
  },
  backIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  configIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  profileBox: {
    borderWidth: 1.5,
    borderColor: "#00BFFF",
    borderRadius: 12,
    padding: 15,
    marginTop: 50,
    marginBottom: 30,
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  optionBox: {
    marginBottom: 30,
    gap: 16,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111A2C",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 12,
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
  },
  logoutBtn: {
    borderColor: "#00BFFF",
    borderWidth: 1.5,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
  },
});

export default LogOutScreen;
