import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditProfileScreen = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      const storedPhoto = await AsyncStorage.getItem('userPhoto');
      if (storedName) setName(storedName);
      if (storedPhoto) setPhoto(storedPhoto);
    };
    loadData();
  }, []);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      if (photo) await AsyncStorage.setItem('userPhoto', photo);
      Alert.alert('Perfil actualizado');
      navigation.goBack();
    } catch (e) {
      console.error('Error al guardar', e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        <Image
          source={{
            uri: photo || 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png',
          }}
          style={styles.avatar}
        />
        <Text style={styles.editPhotoText}>Cambiar imagen</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#020D19',
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  backIcon: {
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: '#00BFFF',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  editPhotoText: {
    marginTop: 10,
    color: '#00BFFF',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#00BFFF',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#00BFFF',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
