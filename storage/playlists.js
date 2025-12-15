import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "playlists";

export async function getPlaylists() {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : {};
}

export async function savePlaylists(data) {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}

export async function createPlaylist(name) {
  const playlists = await getPlaylists();
  playlists[name] = [];
  await savePlaylists(playlists);
}

export async function addToPlaylist(name, fileName) {
  const playlists = await getPlaylists();
  if (!playlists[name]) playlists[name] = [];
  if (!playlists[name].includes(fileName)) playlists[name].push(fileName);
  await savePlaylists(playlists);
}

export async function deletePlaylist(name) {
  const playlists = await getPlaylists();
  delete playlists[name];
  await savePlaylists(playlists);
}

export async function removeFromPlaylist(name, fileName) {
  const playlists = await getPlaylists();
  playlists[name] = playlists[name].filter(f => f !== fileName);
  await savePlaylists(playlists);
}
