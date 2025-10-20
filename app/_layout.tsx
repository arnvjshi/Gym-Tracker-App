import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar style={Platform.OS === 'android' ? 'light' : 'auto'} />
      <Tabs screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#22c55e',
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#e5e7eb',
        tabBarStyle: { backgroundColor: '#0b1220', borderTopColor: '#111827' },
        tabBarLabelStyle: { fontSize: 11 },
      }}>
        <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
        <Tabs.Screen name="exercises" options={{ title: 'Workouts' }} />
        <Tabs.Screen name="muscle-map" options={{ title: 'Muscles' }} />
        <Tabs.Screen name="weigh-in" options={{ title: 'Weight' }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      </Tabs>
    </>
  );
}
