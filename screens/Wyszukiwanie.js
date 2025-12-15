import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StyledContainer from './StyledContainer';
import { useNavigation } from '@react-navigation/native';
import { filest } from "../Components/FileLoader/data";
import { Asset } from "expo-asset";

const Wyszukiwanie = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    const loadAllAssets = async () => {
      const rawFiles = filest["ExampleFiles"];
      const loaded = [];

      for (let f of rawFiles) {
        const asset = Asset.fromModule(f.path);
        await asset.downloadAsync();

        loaded.push({
          name: f.name,
          type: asset.type,
          asset: asset,
          path: f.path
        });
      }
      setAllFiles(loaded);
    };

    loadAllAssets();
  }, []);

  const handleSearch = (text) => {
    setQuery(text);

    if (text.length === 0) {
      setResults([]);
      return;
    }

    const filtered = allFiles.filter((file) =>
      file.name.toLowerCase().includes(text.toLowerCase())
    );

    setResults(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => navigation.navigate("Odtwarzacz", {
        I_inf: item.asset,
        I_ref: item.path
      })}
    >
      <Ionicons
        name={
          item.type === "mp3" ? "musical-notes" :
          item.type === "mp4" ? "videocam" :
          "image"
        }
        size={30}
        color="#007AFF"
        style={{ marginRight: 12 }}
      />
      <Text style={styles.videoTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <StyledContainer title="Wyszukiwanie" subtitle="">
      {}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={22} color="#555" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Szukaj pliku..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      {}
      {query.length === 0 ? (
        <Text style={styles.infoText}>Wpisz nazwę pliku</Text>
      ) : results.length === 0 ? (
        <Text style={styles.infoText}>Brak wyników dla: "{query}"</Text>
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
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
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
});

export default Wyszukiwanie;
