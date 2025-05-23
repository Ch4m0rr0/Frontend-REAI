import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mockResults = [
  {
    id: 1,
    title: 'Carta de Solicitud de Beca',
    description: 'Por medio de la presente yo, (Tu nombre) con número de carnet XXXXX inscrito en la carrera de (Tu carrera) cursando en (Tu año actual), me dirijo a usted de manera atenta y que sea considerado para obtener una beca...',
    author: 'Norlan Umaña',
    avatar: 'https://placehold.co/40x40',
    rating: 4.5,
    likes: 500,
    comments: 300,
    savedLiters: '6.5 lts',
    timesUsed: 800,
    shares: 100,
  },
  {
    id: 2,
    title: 'Carta de Solicitud de Beca',
    description: 'Por medio de la presente yo, (Tu nombre) con número de carnet XXXXX inscrito en la carrera de (Tu carrera) cursando en (Tu año actual), me dirijo a usted de manera atenta y que sea considerado para obtener una beca...',
    author: 'Rosmery García',
    avatar: 'https://placehold.co/40x40',
    rating: 2.8,
    likes: 95,
    comments: 10,
    savedLiters: '1.4 lts',
    timesUsed: 12,
    shares: 5,
  },
];

const SearchResultsScreen = ({ navigation, route }) => {
  const { query } = route.params || { query: '' };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{query}</Text>
      </View>

      <Text style={styles.subtitle}>Resultados</Text>

      {mockResults.map((result, idx) => (
        <View key={result.id} style={[styles.card, idx === 1 && styles.secondCard]}>
          <View style={styles.cardHeader}>
            <Ionicons name="save-outline" size={22} color="#00BFFF" />
            <Text style={styles.cardTitle}>{result.title}</Text>
          </View>

          <Text style={styles.description}>
            {result.description.split('...')[0]}...
          </Text>

          <View style={styles.authorRow}>
            <Image source={{ uri: result.avatar }} style={styles.avatar} />
            <Text style={styles.authorName}>{result.author}</Text>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{result.rating}</Text>
              <Ionicons name="star" size={16} color="#FFD700" />
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{result.likes}</Text>
              <Ionicons name="heart" size={16} color="#FF5555" />
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{result.comments}</Text>
              <Ionicons name="chatbubble-ellipses" size={16} color="#00BFFF" />
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{result.savedLiters}</Text>
              <Ionicons name="water" size={16} color="#00BFFF" />
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{result.timesUsed} veces</Text>
            </View>
            <View style={styles.metric}>
              <Ionicons name="share-social-outline" size={16} color="#00BFFF" />
              <Text style={styles.metricValue}>{result.shares}</Text>
            </View>
          </View>
        </View>
      ))}

      <Text style={styles.similarText}>Otra similar con menos interacciones</Text>
    </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#ccc',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  card: {
    borderWidth: 2,
    borderColor: '#00BFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#121F3C',
  },
  secondCard: {
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: '#00BFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginRight: 10,
  },
  authorName: {
    color: '#fff',
    fontSize: 14,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 8,
  },
  metricValue: {
    color: '#fff',
    marginRight: 4,
  },
  similarText: {
    color: '#ccc',
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SearchResultsScreen;
