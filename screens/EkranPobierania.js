import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StyledContainer from './StyledContainer';

const EkranPobierania = () => {
  
  const files = [
    { id: '1', name: 'Utwór_1.mp3', type: 'audio' },
    { id: '2', name: 'Utwór_2.mp3', type: 'audio' },
    { id: '3', name: 'Utwór_3.mp3', type: 'audio' },
    { id: '4', name: 'Utwór_4.mp3', type: 'audio' },
    { id: '5', name: 'Zdjecie_1.jpg', type: 'image' },
    { id: '6', name: 'Zdjecie_2.jpg', type: 'image' },
    { id: '7', name: 'Zdjecie_3.jpg', type: 'image' },
    { id: '8', name: 'Zdjecie_4.jpg', type: 'image' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Ionicons
        name={
          item.type === 'audio'
            ? 'musical-notes'
            : item.type === 'video'
            ? 'videocam'
            : 'image'
        }
        size={28}
        color="#007AFF"
        style={styles.icon}
      />
      <Text style={styles.fileName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <StyledContainer
      title="Pobrane pliki"
      subtitle=""
    >
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  icon: {
    marginRight: 12,
  },
  fileName: {
    fontSize: 16,
    color: '#1a1a2e',
    fontWeight: '500',
  },
});

export default EkranPobierania;