import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const DraftsScreen = () => {
  const [drafts, setDrafts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadDrafts = async () => {
      try {
        const stored = await AsyncStorage.getItem('drafts');
        if (stored) {
          setDrafts(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Error loading drafts:', err);
      }
    };
    const unsubscribe = navigation.addListener('focus', loadDrafts);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (indexToRemove) => {
    const updatedDrafts = drafts.filter((_, i) => i !== indexToRemove);
    setDrafts(updatedDrafts);
    await AsyncStorage.setItem('drafts', JSON.stringify(updatedDrafts));
  };

  const handleEdit = (draft) => {
    navigation.navigate('CreatePetition', { draft });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Borradores guardados</Text>

      {drafts.length === 0 ? (
        <Text style={styles.emptyText}>No hay borradores aún.</Text>
      ) : (
        drafts.map((draft, index) => (
          <View key={index} style={styles.draftCard}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => handleEdit(draft)}
            >
              <Text style={styles.draftTitle}>{draft.title || 'Sin título'}</Text>
              <Text style={styles.draftSnippet}>
                {(draft.content || 'Sin contenido').slice(0, 60)}...
              </Text>
              <Text style={styles.draftDate}>
                Fecha: {new Date(draft.date).toLocaleDateString('es-ES')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(index)}>
              <Ionicons name="trash" size={22} color="#ff4d4d" />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020D19',
    padding: 20,
  },
  backIcon: {
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
  draftCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121F3C',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#00BFFF',
  },
  draftTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
  },
  draftSnippet: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4,
  },
  draftDate: {
    color: '#888',
    fontSize: 12,
  },
});

export default DraftsScreen;
