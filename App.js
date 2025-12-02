import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text } from 'react-native';

import { DarkModeProvider } from './Components/FileLoader/DarkModeContext';

import EkranPobierania from './screens/EkranPobierania';
import Logowanie from './screens/Logowanie';
import Wyszukiwanie from './screens/Wyszukiwanie';
import Ustawienia from './screens/Ustawienia';
import StyledContainer from './screens/StyledContainer';
import PlayerScreen from './screens/Odtwarzacz';
import DetailScreen from './screens/Szczegoly';
import FilelistScreen from './screens/ListaPlikow';

const ListaPlikow = () => (
  <FilelistScreen>
    
  </FilelistScreen>
  
);


const Playlisty = () => (
  <StyledContainer 
    title="Playlisty" 
    subtitle=""
  >
    <Text style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>

    </Text>
  </StyledContainer>
);


const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: "",
        headerTransparent: true,
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
        tabBarStyle: { backgroundColor: '#f7f7f7', paddingBottom: 5, height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Pobrane':
              iconName = 'download-outline';
              break;
            case 'Wyszukiwanie':
              iconName = 'search-outline';
              break;
            case 'Lista plikow':
              iconName = 'folder-outline';
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
      <Tab.Screen name="Lista plikow" component={ListaPlikow} />
      <Tab.Screen name="Pobrane" component={EkranPobierania} />
      <Tab.Screen name="Wyszukiwanie" component={Wyszukiwanie} />
      <Tab.Screen name="Playlisty" component={Playlisty} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // 👇 OWIŃ CAŁĄ APLIKACJĘ W DarkModeProvider
    <DarkModeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Logowanie">
          <Stack.Screen name="Logowanie" component={Logowanie} options={{ headerShown: false }} />
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Ustawienia" component={Ustawienia} options={{ headerShown: false }} />
          <Stack.Screen name="Odtwarzacz" component={PlayerScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Szczegoly" component={DetailScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </DarkModeProvider>
  );
}