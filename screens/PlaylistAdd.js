import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import StyledContainer from "./StyledContainer";
import { filest } from "../Components/FileLoader/data";
import { createPlaylist, addToPlaylist } from "../storage/playlists";

export default function PlaylistAdd({ navigation }) {
  const [name, setName] = useState("");
  const [created, setCreated] = useState(false);

  const files = filest["ExampleFiles"]; 
  const handleCreate = async () => {
    if (!name) return;
    await createPlaylist(name);
    setCreated(true);
  };

  const addFile = async (file) => {
    await addToPlaylist(name, file.name);
  };

  return (
    <StyledContainer title="Nowa playlista" subtitle="">
      {!created ? (
        <>
          <Text style={styles.label}>Nazwa playlisty:</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            value={name}
            onChangeText={setName}
          />

          <TouchableOpacity style={styles.btn} onPress={handleCreate}>
            <Text style={styles.btnText}>Utwórz playlistę</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Dodaj utwory:</Text>

          <FlatList
            data={files}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.fileRow}>
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => addFile(item)}
                >
                  <Text style={styles.addText}>Dodaj</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <TouchableOpacity
            style={[styles.btn, { marginTop: 20 }]}
            onPress={() => navigation.navigate("PlaylistSelect")}
          >
            <Text style={styles.btnText}>Zakończ</Text>
          </TouchableOpacity>
        </>
      )}
    </StyledContainer>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f8f9fa",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16
  },
  btn: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 14
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700"
  },
  fileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 10
  },
  addBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 10
  },
  addText: {
    color: "white",
    fontWeight: "700"
  }
});
