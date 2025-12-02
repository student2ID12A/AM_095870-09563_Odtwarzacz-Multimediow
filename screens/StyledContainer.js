import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDarkMode } from '../Components/FileLoader/DarkModeContext'; // 👈 DODAJ TEN IMPORT

const StyledContainer = ({ children, title, subtitle }) => {
  const { darkMode } = useDarkMode(); // 👈 UŻYJ HOOKA Z CONTEXT

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      {/* Dekoracyjne koła w tle */}
      <View style={[styles.backgroundCircle1, darkMode && styles.darkBackgroundCircle1]} />
      <View style={[styles.backgroundCircle2, darkMode && styles.darkBackgroundCircle2]} />
      <View style={[styles.backgroundCircle3, darkMode && styles.darkBackgroundCircle3]} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={[styles.formContainer, darkMode && styles.darkFormContainer]}>
          {/* Opcjonalny tytuł */}
          {title && (
            <Text style={[styles.tytul, darkMode && styles.darkTytul]}>{title}</Text>
          )}
          
          {/* Opcjonalny podtytuł */}
          {subtitle && (
            <Text style={[styles.podtytul, darkMode && styles.darkPodtytul]}>{subtitle}</Text>
          )}
          
          {/* Treść ekranu */}
          {children}
          
          {/* Dekoracyjne kropki na dole */}
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, { backgroundColor: '#007AFF' }]} />
            <View style={[styles.dot, { backgroundColor: '#5856D6' }]} />
            <View style={[styles.dot, { backgroundColor: '#FF2D55' }]} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    flexGrow: 1,
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
  darkBackgroundCircle1: {
    backgroundColor: 'rgba(0, 122, 255, 0.03)',
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
  darkBackgroundCircle2: {
    backgroundColor: 'rgba(88, 86, 214, 0.03)',
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
  darkBackgroundCircle3: {
    backgroundColor: 'rgba(255, 45, 85, 0.02)',
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
  darkFormContainer: {
    backgroundColor: '#2d2d2d',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  tytul: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
    color: '#007AFF',
  },
  darkTytul: {
    color: '#4dabf7',
  },
  podtytul: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    lineHeight: 22,
  },
  darkPodtytul: {
    color: '#aaaaaa',
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

export default StyledContainer;