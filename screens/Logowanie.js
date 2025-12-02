import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logowanie = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const [trybRejestracji, setTrybRejestracji] = useState(false);
  const [uzytkownicy, setUzytkownicy] = useState({});
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));

  useEffect(() => {
  const wczytaj = async () => {
    try {
      const dane = await AsyncStorage.getItem('uzytkownicy');
      if (dane) setUzytkownicy(JSON.parse(dane));
    } catch (e) {
      console.log("Błąd odczytu AsyncStorage", e);
    }
  };
  wczytaj();

  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false, 
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: false, 
    }),
  ]).start();
}, []);

  const zapiszUzytkownikow = async (nowi) => {
    try {
      await AsyncStorage.setItem('uzytkownicy', JSON.stringify(nowi));
      setUzytkownicy(nowi);
    } catch (e) {}
  };

  const showAlert = (title) => {
    if (Platform.OS === 'web') {
      window.alert(title);
    } else {
      const { Alert } = require('react-native');
      Alert.alert(title);
    }
  };

  const obsluzZatwierdzenie = () => {
    if (!login || !haslo) {
      showAlert('Wpisz login i hasło');
      return;
    }

    if (trybRejestracji) {
      if (uzytkownicy[login]) {
        showAlert('Ten login jest już zajęty');
        return;
      }
      const nowi = { ...uzytkownicy, [login]: haslo };
      zapiszUzytkownikow(nowi);
      showAlert('Konto utworzone! Możesz się zalogować.');
      setTrybRejestracji(false);
      setLogin('');
      setHaslo('');
      return;
    }

    if (login === 'admin' && haslo === 'admin') {
      showAlert('Zalogowano jako admin');
      if (navigation && navigation.replace) navigation.replace('MainTabs');
      return;
    }

    if (uzytkownicy[login] && uzytkownicy[login] === haslo) {
      showAlert(`Zalogowano jako ${login}`);
      if (navigation && navigation.replace) navigation.replace('MainTabs');
      return;
    }

    showAlert('Nieprawidłowy login lub hasło!');
  };

  return (
    <View style={styles.container}>
      {}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />
      
      <Animated.View 
        style={[
          styles.formContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
       

        <Text style={styles.tytul}>
          {trybRejestracji ? 'Rejestracja' : 'Logowanie'}
        </Text>
        
        <Text style={styles.podtytul}>
          {trybRejestracji 
            ? '' 
            : ''}
        </Text>

        {}
        <View style={styles.inputWrapper}>
          <View style={styles.inputIconContainer}>
            <Text style={styles.inputIcon}></Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nazwa użytkownika"
            placeholderTextColor="#999"
            autoCapitalize="none"
            value={login}
            onChangeText={setLogin}
            testID="loginInput"
          />
        </View>

        {}
        <View style={styles.inputWrapper}>
          <View style={styles.inputIconContainer}>
            <Text style={styles.inputIcon}></Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Hasło"
            placeholderTextColor="#999"
            secureTextEntry
            value={haslo}
            onChangeText={setHaslo}
            testID="passwordInput"
          />
        </View>

        {}
        <TouchableOpacity 
          style={styles.przycisk} 
          onPress={obsluzZatwierdzenie} 
          testID="submitBtn"
          activeOpacity={0.85}
        >
          <Text style={styles.przyciskTekst}>
            {trybRejestracji ? 'Zarejestruj się' : 'Zaloguj się'}
          </Text>
        </TouchableOpacity>

        {}
        <View style={styles.przełącznikContainer}>
          <Text style={styles.przełącznikTekst}>
            {trybRejestracji ? 'Masz już konto?' : 'Nie masz konta?'}
          </Text>
          <TouchableOpacity onPress={() => setTrybRejestracji(!trybRejestracji)}>
            <Text style={styles.link}>
              {trybRejestracji ? ' Zaloguj się' : ' Zarejestruj się'}
            </Text>
          </TouchableOpacity>
        </View>

        {}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { backgroundColor: '#007AFF' }]} />
          <View style={[styles.dot, { backgroundColor: '#5856D6' }]} />
          <View style={[styles.dot, { backgroundColor: '#FF2D55' }]} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    padding: 20,
  },
  
  backgroundCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(0, 122, 255, 0.08)',
    top: -150,
    left: -100,
  },
  backgroundCircle2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(88, 86, 214, 0.06)',
    bottom: -100,
    right: -80,
  },
  backgroundCircle3: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 45, 85, 0.05)',
    top: '40%',
    right: -60,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarText: {
    fontSize: 40,
  },
  tytul: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    color: '#007AFF',
  },
  podtytul: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    lineHeight: 22,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  inputIconContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIcon: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    height: 54,
    fontSize: 16,
    color: '#1a1a2e',
    paddingRight: 16,
  },
  przycisk: {
    backgroundColor: '#007AFF',
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  przyciskTekst: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  przełącznikContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  przełącznikTekst: {
    color: '#666',
    fontSize: 15,
  },
  link: {
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '700',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default Logowanie;