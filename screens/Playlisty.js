import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import StyledContainer from "./StyledContainer";
import { useNavigation } from "@react-navigation/native";

export default function Playlisty() {
  const navigation = useNavigation();

  return (
    <StyledContainer title="Playlisty" subtitle="">
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PlaylistSelect")}
      >
        <Text style={styles.text}>Moje playlisty</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PlaylistAdd")}
      >
        <Text style={styles.text}>Dodaj playlistę</Text>
      </TouchableOpacity>
    </StyledContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 14,
    marginVertical: 10
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "700"
  }
});
