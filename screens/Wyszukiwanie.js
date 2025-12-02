import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StyledContainer from './StyledContainer';
import { useNavigation } from '@react-navigation/native';

const Wyszukiwanie = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  const sampleData = [
    { id: '1', title: '1', artist: '1', views: '2 tys. wyświetleń' },
    { id: '2', title: '1', artist: '1', views: '8,4 tys. wyświetleń' },
    { id: '3', title: '1', artist: '1', views: '3231 wyświetleń' },
    { id: '4', title: '1', artist: '1', views: '2111 wyświetleń' },
    { id: '5', title: '1', artist: '1', views: '22 wyświetleń' },
    { id: '6', title: '1', artist: '1', views: '12 wyświetleń' },
  ];

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = sampleData.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem}>
      <View style={styles.resultContent}>
        <View style={styles.thumbnail} />
        <View style={{ flex: 1 }}>
          <Text style={styles.videoTitle}>{item.title}</Text>
          <Text style={styles.videoArtist}>{item.artist}</Text>
          <Text style={styles.videoViews}>{item.views}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <StyledContainer 
      title="Wyszukiwanie" 
      subtitle=""
    >
      {/* Pasek wyszukiwania */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={22} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Szukaj..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      {/* Wyniki wyszukiwania*/}
      {query.length === 0 ? (
        <Text style={styles.infoText}></Text>
      ) : results.length === 0 ? (
        <Text style={styles.infoText}>Brak wyników dla: "{query}"</Text>
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    color: '#1a1a2e',
  },
  infoText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 40,
    fontSize: 16,
  },
  resultsList: {
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  thumbnail: {
    width: 120,
    height: 70,
    backgroundColor: '#d0d0d0',
    borderRadius: 8,
    marginRight: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  videoArtist: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  videoViews: {
    fontSize: 12,
    color: '#999',
  },
});

export default Wyszukiwanie;