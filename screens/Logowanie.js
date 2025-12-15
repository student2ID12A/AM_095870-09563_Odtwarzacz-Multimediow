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
import { api } from '../api/client';

const Logowanie = ({ navigation }) => {
  console.log("LOG: Komponent Logowanie renderuje się");

  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const [trybRejestracji, setTrybRejestracji] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.9));

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const openModal = (msg) => {
    setModalMsg(msg);
    setModalVisible(true);
  };

  useEffect(() => {
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

  const handleLoginAPI = async () => {
    console.log("LOG: START handleLoginAPI()");

    try {
      const users = await api.findUser(login, haslo);

      if (!Array.isArray(users) || users.length === 0) {
        openModal("Nieprawidłowy login lub hasło!");
        return;
      }

      openModal(`Zalogowano jako ${login}`);
      setTimeout(() => navigation.replace("MainTabs"), 900);

    } catch (e) {
      openModal("Błąd połączenia z API: " + e.message);
    }
  };

  const handleRegisterAPI = async () => {
    console.log("LOG: START handleRegisterAPI()");

    try {
      const exists = await api.userExists(login);

      if (exists) {
        openModal("Ten login jest już zajęty");
        return;
      }

      await api.registerUser(login, haslo);
      openModal("Konto utworzone! Możesz się zalogować.");

      setTrybRejestracji(false);
      setLogin('');
      setHaslo('');

    } catch (e) {
      openModal("Błąd połączenia z API: " + e.message);
    }
  };

  const obsluzZatwierdzenie = () => {
    if (!login || !haslo) {
      openModal("Wpisz login i hasło");
      return;
    }

    if (trybRejestracji) handleRegisterAPI();
    else handleLoginAPI();
  };

  return (
    <View style={styles.container}>
      {}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />

      {}
      <Animated.View
        style={[
          styles.formContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.tytul}>
          {trybRejestracji ? 'Rejestracja' : 'Logowanie'}
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
          />
        </View>

        {}
        <TouchableOpacity
          style={styles.przycisk}
          onPress={obsluzZatwierdzenie}
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

        {/* KROPKI */}
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { backgroundColor: '#007AFF' }]} />
          <View style={[styles.dot, { backgroundColor: '#5856D6' }]} />
          <View style={[styles.dot, { backgroundColor: '#FF2D55' }]} />
        </View>
      </Animated.View>

      {}
      {modalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>{modalMsg}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  modalOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalBox: {
    width: "75%",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 18,
    elevation: 10,
  },
  modalText: {
    textAlign: "center",
    fontSize: 17,
    marginBottom: 20,
    fontWeight: "500",
  },
  modalButton: {
    alignSelf: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 12,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

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
  tytul: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    color: '#007AFF',
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
  },
  przyciskTekst: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  przełącznikContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
