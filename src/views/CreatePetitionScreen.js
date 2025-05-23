import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePetitionScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (route.params?.draft) {
      const { title, content } = route.params.draft;
      setTitle(title);
      setContent(content);
    }
  }, [route.params]);

  const handleGoBack = () => {
    if (title || content) {
      setShowExitModal(true);
    } else {
      navigation.goBack();
    }
  };

  const handleSaveDraft = async () => {
    const draft = { title, content, date: new Date().toISOString() };
    try {
      const drafts = await AsyncStorage.getItem('drafts');
      const parsed = drafts ? JSON.parse(drafts) : [];
      parsed.push(draft);
      await AsyncStorage.setItem('drafts', JSON.stringify(parsed));
      Alert.alert('Guardado', 'La petición se guardó en borradores.');
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePublish = () => {
    if (!title || !content) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    Alert.alert('Éxito', 'Tu petición se ha publicado correctamente.');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePublish} style={styles.publishButton}>
          <Text style={styles.publishButtonText}>Publicar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtersRow}>
        <Text style={styles.filter}>▾ Público</Text>
        <Text style={styles.filter}>▾ Categorías</Text>
        <Text style={styles.filter}>▾ Etiquetas</Text>
        <Ionicons name="add-circle-outline" size={24} color="#fff" />
      </View>

      <TextInput
        style={styles.inputTitle}
        placeholder="Título de la petición"
        placeholderTextColor="#ccc"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.inputContent}
        placeholder="Contenido..."
        placeholderTextColor="#ccc"
        multiline
        value={content}
        onChangeText={setContent}
      />

      {/* Exit Modal */}
      <Modal transparent visible={showExitModal} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>¿Quieres subir la petición más tarde?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.modalOption}>
              <Ionicons name="trash-outline" size={18} color="#fff" />
              <Text style={styles.modalText}>Descartar publicación</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSaveDraft} style={styles.modalOption}>
              <Ionicons name="save-outline" size={18} color="#fff" />
              <Text style={styles.modalText}>
                Guardar en <Text style={{ fontWeight: 'bold' }}>Borradores</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowExitModal(false)} style={styles.modalOption}>
              <Ionicons name="checkmark" size={18} color="#fff" />
              <Text style={styles.modalText}>Seguir editando</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setShowExitModal(false)} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#fff" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020D19', padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  publishButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#00BFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  publishButtonText: { color: '#fff', fontWeight: 'bold' },
  filtersRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  filter: {
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  inputTitle: {
    borderWidth: 2,
    borderColor: '#00BFFF',
    borderRadius: 15,
    padding: 10,
    color: '#fff',
    marginBottom: 16,
  },
  inputContent: {
    borderWidth: 2,
    borderColor: '#00BFFF',
    borderRadius: 15,
    padding: 10,
    color: '#fff',
    height: 160,
    textAlignVertical: 'top',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalBox: {
    backgroundColor: '#111a2b',
    padding: 20,
    borderRadius: 15,
    width: width * 0.85,
    position: 'relative',
  },
  modalTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 14,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  modalText: { color: '#fff', fontSize: 14 },
  closeBtn: { position: 'absolute', top: 10, right: 10 },
});

export default CreatePetitionScreen;
