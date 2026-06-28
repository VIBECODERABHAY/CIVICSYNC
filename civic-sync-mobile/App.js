import React, { useState, createContext } from 'react';
import { View, Text, TouchableOpacity, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Theme } from './src/theme';

LogBox.ignoreLogs(['Require cycle:']);

// Import New UI Screens
import DashboardScreen from './src/screens/DashboardScreen';
import MapScreen from './src/screens/MapScreen';
import ReportScreen from './src/screens/ReportScreen';
import AuthScreen from './src/screens/AuthScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OfficialDashboardScreen from './src/screens/OfficialDashboardScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const AuthContext = createContext();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const { logout } = React.useContext(AuthContext);

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          else if (route.name === 'Map') iconName = focused ? 'map' : 'map-outline';
          else if (route.name === 'Report') iconName = focused ? 'camera' : 'camera-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Theme.colors.background,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        // Header right removed since Profile tab has a big logout button now
        headerShown: false, // Cleaner minimalist look
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function OfficialTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = focused ? 'briefcase' : 'briefcase-outline';
          else if (route.name === 'Map') iconName = focused ? 'map' : 'map-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Theme.colors.background,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={OfficialDashboardScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

import * as SecureStore from 'expo-secure-store';

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await SecureStore.getItemAsync('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error("Failed to load auth state", e);
      } finally {
        setIsAuthLoading(false);
      }
    };
    loadUser();
  }, []);

  const authContextValue = {
    user,
    login: async (userData) => {
      try {
        setUser(userData);
        await SecureStore.setItemAsync('user', JSON.stringify(userData));
      } catch(e) {
        console.error("Failed to save auth state", e);
      }
    },
    logout: async () => {
      try {
        setUser(null);
        await SecureStore.deleteItemAsync('user');
      } catch(e) {
        console.error("Failed to clear auth state", e);
      }
    }
  };

  if (isAuthLoading) {
    return (
      <View style={{flex: 1, backgroundColor: Theme.colors.background, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: Theme.colors.primary, fontSize: 18, fontWeight: 'bold'}}>CivicSync</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContextValue}>
        <NavigationContainer>
          <StatusBar style="auto" />
          {user ? (user.role === 'official' ? <OfficialTabs /> : <MainTabs />) : <AuthStack />}
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
