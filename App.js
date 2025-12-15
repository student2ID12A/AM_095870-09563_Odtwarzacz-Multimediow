import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { DarkModeProvider } from './Components/FileLoader/DarkModeContext';

import Logowanie from './screens/Logowanie';
import EkranPobierania from './screens/EkranPobierania';
import Wyszukiwanie from './screens/Wyszukiwanie';
import Ustawienia from './screens/Ustawienia';
import PlayerScreen from './screens/Odtwarzacz';
import DetailScreen from './screens/Szczegoly';
import FilelistScreen from './screens/ListaPlikow';

import Playlisty from './screens/Playlisty';
import PlaylistAdd from './screens/PlaylistAdd';
import PlaylistSelect from './screens/PlaylistSelect';
import PlaylistView from './screens/PlaylistView';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerTitle: '',
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Ustawienia')}
            style={{
              marginRight: 16,
              backgroundColor: 'rgba(255,255,255,0.9)',
              padding: 8,
              borderRadius: 20,
            }}
          >
            <Ionicons name="settings-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        ),

        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          backgroundColor: '#f7f7f7',
          height: 60,
          paddingBottom: 5,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Lista plików':
              iconName = 'folder-outline';
              break;
            case 'Pobrane':
              iconName = 'download-outline';
              break;
            case 'Wyszukiwanie':
              iconName = 'search-outline';
              break;
            case 'Playlisty':
              iconName = 'albums-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Lista plików" component={FilelistScreen} />
      <Tab.Screen name="Pobrane" component={EkranPobierania} />
      <Tab.Screen name="Wyszukiwanie" component={Wyszukiwanie} />
      <Tab.Screen name="Playlisty" component={Playlisty} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <DarkModeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Logowanie">

          <Stack.Screen
            name="Logowanie"
            component={Logowanie}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Ustawienia"
            component={Ustawienia}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Odtwarzacz"
            component={PlayerScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Szczegoly" component={DetailScreen} />

          {}
          <Stack.Screen name="PlaylistAdd" component={PlaylistAdd} />
          <Stack.Screen name="PlaylistSelect" component={PlaylistSelect} />
          <Stack.Screen name="PlaylistView" component={PlaylistView} />

        </Stack.Navigator>
      </NavigationContainer>
    </DarkModeProvider>
  );
}
