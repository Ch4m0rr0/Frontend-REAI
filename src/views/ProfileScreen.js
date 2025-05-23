import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('Jeremaya San John');
  const [photo, setPhoto] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const loadProfile = async () => {
        const storedName = await AsyncStorage.getItem('userName');
        const storedPhoto = await AsyncStorage.getItem('userPhoto');
        if (storedName) setName(storedName);
        if (storedPhoto) setPhoto(storedPhoto);
      };
      loadProfile();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      {/* Back */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      {/* Perfil */}
      <View style={styles.profileBox}>
        <Image
          source={{
            uri:
              photo ||
              'https://cdn-icons-png.flaticon.com/512/1077/1077012.png',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Ionicons name="pencil" size={16} color="#00BFFF" />
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
      </View>

      {/* Métricas simuladas */}
      <View style={styles.metricsBox}>
        <View style={styles.metric}>
          <Text style={styles.metricNumber}>520</Text>
          <Text style={styles.metricLabel}>Likes</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricNumber}>132</Text>
          <Text style={styles.metricLabel}>Comentarios</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricNumber}>8</Text>
          <Text style={styles.metricLabel}>Destacados</Text>
        </View>
      </View>

      {/* Acerca de */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acerca de mí</Text>
        <Text style={styles.sectionContent}>
          Soy estudiante apasionado por la tecnología, con enfoque en soluciones sostenibles usando IA. Me encanta compartir recursos útiles y aprender colaborativamente.
        </Text>
      </View>

      {/* Más adelante podrías agregar logros, historial, etc. */}
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020D19',
    padding: 20,
    paddingTop: 30,
  },
  profileBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#00BFFF',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#00BFFF',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  editText: {
    color: '#00BFFF',
    marginLeft: 6,
    fontSize: 14,
  },
  metricsBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#111A2C',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
  },
  metric: {
    alignItems: 'center',
  },
  metricNumber: {
    color: '#00BFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  metricLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    backgroundColor: '#121F3C',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#00BFFF',
  },
  sectionTitle: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ProfileScreen;
