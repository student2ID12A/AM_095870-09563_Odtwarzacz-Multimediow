import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, FlatList } from "react-native";
import StyledContainer from "./StyledContainer";
import { getPlaylists } from "../storage/playlists";
import { useNavigation } from "@react-navigation/native";

export default function PlaylistSelect() {
  const [playlists, setPlaylists] = useState({});
  const navigation = useNavigation();

  const load = async () => {
    const p = await getPlaylists();
    setPlaylists(p);
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", load);
    return unsub;
  }, []);

  return (
    <StyledContainer title="Moje playlisty" subtitle="">
      <FlatList
        data={Object.keys(playlists)}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate("PlaylistView", { name: item })}
          >
            <Text style={styles.name}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </StyledContainer>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    marginVertical: 8,
    borderRadius: 12
  },
  name: {
    fontSize: 18,
    fontWeight: "700"
  }
});
