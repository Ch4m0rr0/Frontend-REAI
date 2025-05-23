import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const suggestionsMock = [
  'Carta de renuncia formal',
  'Resumen de la Batalla de San Jacinto',
  'Investigación sobre Enfermedades de Transmisión Sexual',
  'Diagramas Plantillas',
  'Carta de solicitud de beca',
  'Carta para solicitar exámenes especiales',
  'Convalidación de materias de intercambio',
  'Certificación de notas para becas externas',
];

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestionsMock);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [inputFocused, setInputFocused] = useState(false);

  const handleSearch = () => {
    const filtered = suggestionsMock.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSuggestions(filtered);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onFocusInput = () => {
    setInputFocused(true);
    handleSearch();
  };

  const onBlurInput = () => {
    // Ocultar sugerencias al perder foco\:
    setInputFocused(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back-outline" size={26} color="#fff" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar peticiones"
          placeholderTextColor="#ccc"
          value={query}
          onChangeText={setQuery}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={() => navigation.navigate('SearchResults', { query })}>
          <Ionicons name="search-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {inputFocused && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.suggestionButton}>
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </Animated.View>
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020D19',
    padding: 16,
    paddingTop: 40,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#121F3C',
    borderRadius: 10,
    paddingHorizontal: 12,
    color: '#fff',
    marginHorizontal: 10,
    height: 40,
  },
  suggestionButton: {
    borderWidth: 2,
    borderColor: '#00BFFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  suggestionText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default SearchScreen;
