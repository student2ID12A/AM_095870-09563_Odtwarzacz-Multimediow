import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, FlatList, View } from "react-native";
import StyledContainer from "./StyledContainer";
import { getPlaylists, removeFromPlaylist, deletePlaylist } from "../storage/playlists";

export default function PlaylistView({ route, navigation }) {
  const { name } = route.params;
  const [files, setFiles] = useState([]);

  const load = async () => {
    const all = await getPlaylists();
    setFiles(all[name] || []);
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", load);
    return unsub;
  }, []);

  const remove = async (file) => {
    await removeFromPlaylist(name, file);
    load();
  };

  const deleteList = async () => {
    await deletePlaylist(name);
    navigation.goBack();
  };

  return (
    <StyledContainer title={name} subtitle="">
      <TouchableOpacity style={styles.deleteBtn} onPress={deleteList}>
        <Text style={styles.deleteText}>Usuń playlistę</Text>
      </TouchableOpacity>

      <FlatList
        data={files}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.file}>{item}</Text>
            <TouchableOpacity style={styles.removeBtn} onPress={() => remove(item)}>
              <Text style={styles.removeText}>Usuń</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </StyledContainer>
  );
}

const styles = StyleSheet.create({
  deleteBtn: {
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20
  },
  deleteText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10
  },
  file: {
    fontSize: 16,
    fontWeight: "600"
  },
  removeBtn: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10
  },
  removeText: {
    color: "white",
    fontWeight: "700"
  }
});
