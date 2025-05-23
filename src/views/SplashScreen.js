import React from 'react';
import { View, Image, Button, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Isotipe.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Button title="Comencemos" onPress={() => navigation.navigate('Welcome')} />
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
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 30,
  },
});

export default SplashScreen;
