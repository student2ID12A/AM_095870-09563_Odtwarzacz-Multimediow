import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import StyledContainer from './StyledContainer';
import { useDarkMode } from '../Components/FileLoader/DarkModeContext';

const Ustawienia = () => {
  const { darkMode, setDarkMode } = useDarkMode(); 
  const navigation = useNavigation();

  return (
    <StyledContainer
      title="Ustawienia"
      subtitle=""
    >
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={darkMode ? "#4dabf7" : "#007AFF"} />
        <Text style={[styles.backText, darkMode && styles.darkBackText]}></Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.labelContainer}>
          <Text style={[styles.label, darkMode && styles.darkLabel]}>Tryb ciemny</Text>
          <Text style={[styles.subLabel, darkMode && styles.darkSubLabel]}>
            {darkMode ? 'Ciemny motyw włączony' : 'Jasny motyw włączony'}
          </Text>
        </View>
        <Switch 
          value={darkMode} 
          onValueChange={setDarkMode} 
          trackColor={{ false: '#f0f0f0', true: '#007AFF' }}
          thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
        />
      </View>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
    fontWeight: '600',
  },
  darkBackText: {
    color: '#4dabf7',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 8,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  darkLabel: {
    color: '#ffffff',
  },
  subLabel: {
    fontSize: 14,
    color: '#666',
  },
  darkSubLabel: {
    color: '#cccccc',
  },
});

export default Ustawienia;