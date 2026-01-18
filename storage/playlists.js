import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "playlists";

export async function getPlaylists() {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : {};
}

export async function savePlaylists(data) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
  
}

export async function createPlaylist(name,logged) {
  const playlists = await getPlaylists();
  playlists[name] = {"user":logged,"files":[]};
  await savePlaylists(playlists);
}

export async function addToPlaylist(name,logged, fileName) {
  const playlists = await getPlaylists();
  if (!playlists[name]||playlists[name].user!=logged) playlists[name] = {"user":logged,"files":[]};
  if (!playlists[name]["files"].includes(fileName)) playlists[name]["files"].push(fileName);
  await savePlaylists(playlists);
}

export async function deletePlaylist(name) {
  const playlists = await getPlaylists();
  delete playlists[name];
  await savePlaylists(playlists);
}

export async function removeFromPlaylist(name, fileName) {
  const playlists = await getPlaylists();
  playlists[name]["files"] = playlists[name]["files"].filter(f => f !== fileName);
  await savePlaylists(playlists);
}
