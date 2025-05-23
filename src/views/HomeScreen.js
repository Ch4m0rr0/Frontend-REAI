import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [avatar, setAvatar] = useState("https://placehold.co/40x40");
  const [name, setName] = useState("Usuario");

  const cartaTexto = `Saludos Cordiales
Por medio de la presente yo, (Tu nombre) con número de carnet XXXXXX inscrito en la carrera (Tu carrera) cursando en (Tu año actual), me dirijo a usted de manera atenta y que sea considerado para obtener una beca...`;

  useEffect(() => {
    const loadProfile = async () => {
      const storedAvatar = await AsyncStorage.getItem("user_avatar");
      const storedName = await AsyncStorage.getItem("user_name");
      if (storedAvatar) setAvatar(storedAvatar);
      if (storedName) setName(storedName);
    };

    const unsubscribe = navigation.addListener("focus", loadProfile);
    loadProfile();
    return unsubscribe;
  }, [navigation]);

  const copiarAlPortapapeles = async () => {
    await Clipboard.setStringAsync(cartaTexto);
    Alert.alert(
      "Copiado",
      "El texto de la carta ha sido copiado al portapapeles."
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="home-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("CreatePetition")}
        >
          <Ionicons name="add-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("LogOut")}
        >
          <Ionicons name="menu-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          {avatar.includes("placehold.co") ? (
            <Ionicons name="person-circle" size={40} color="#fff" />
          ) : (
            <Image source={{ uri: avatar }} style={styles.profileImage} />
          )}
        </TouchableOpacity>
      </View>

      {/* Info de petición */}
      <View style={styles.petitionInfo}>
        <Text style={styles.petitionerName}>
          {name} ha compartido una petición
        </Text>
        <Text style={styles.petitionLabel}>
          <Text style={styles.bold}>Petición: </Text>Carta para solicitar beca
        </Text>
        <Text style={styles.petitionLabel}>
          <Text style={styles.bold}>Categoría: </Text>Educación (Universidad)
        </Text>
        <Text style={styles.petitionLabel}>
          <Text style={styles.bold}>Etiquetas: </Text>Carta
        </Text>
      </View>

      {/* Carta */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Carta para solicitud de beca</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>{cartaTexto}</Text>
        </View>
      </View>

      {/* Métricas */}
      <View style={styles.metrics}>
        {[
          ["Calificación", "4.5"],
          ["Comentarios", "300"],
          ["Likes", "500"],
          ["Litros ahorrados", "4.5 lts"],
          ["Veces utilizado", "700"],
        ].map(([label, value], index) => (
          <View key={index} style={styles.metricItem}>
            <Text style={styles.metricTitle}>{label}</Text>
            <Text style={styles.metricValue}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Copiar */}
      <TouchableOpacity
        style={styles.copyButton}
        onPress={copiarAlPortapapeles}
      >
        <Text style={styles.copyButtonText}>Copiar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#020D19",
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  iconButton: {
    padding: 6,
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  petitionInfo: {
    marginBottom: 15,
  },
  petitionerName: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#fff",
  },
  petitionLabel: {
    marginBottom: 4,
    color: "#fff",
  },
  bold: {
    fontWeight: "bold",
    color: "#fff",
  },
  card: {
    backgroundColor: "#121F3C",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#00BFFF",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "#fff",
  },
  cardContent: {
    borderWidth: 1,
    borderColor: "#00BFFF",
    borderRadius: 12,
    padding: 10,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#fff",
  },
  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 15,
  },
  metricItem: {
    width: width * 0.4,
    marginBottom: 12,
    alignItems: "center",
  },
  metricTitle: {
    fontWeight: "bold",
    marginBottom: 2,
    color: "#fff",
  },
  metricValue: {
    fontSize: 16,
    color: "#fff",
  },
  copyButton: {
    backgroundColor: "#00BFFF",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
  },
  copyButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeScreen;
