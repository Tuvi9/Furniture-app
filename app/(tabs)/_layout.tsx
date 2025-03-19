import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4F63AC',
        tabBarInactiveTintColor: '#8D9BB5', // Color for inactive tabs
        tabBarShowLabel: false,
        tabBarStyle: {
          // Customize the tab bar container
          height: 100,
          paddingTop: 25,
          backgroundColor: 'white',
          // Add padding to create space on sides, centering the group of tabs
          paddingHorizontal: 50,
        },
      }}
    >
      <Tabs.Screen name="home" options={{
        tabBarIcon: ({ color, }) => (
            <Feather name="home" color={color} size={28} />
        )
       }} />
      <Tabs.Screen name="favourite" options={{
        tabBarIcon: ({ color }) => (
            <Feather name="bookmark" color={color} size={28} />
        )
       }} />
      <Tabs.Screen name="profile" options={{
        tabBarIcon: ({ color }) => (
            <Feather name="user" color={color} size={28} />
        )
       }} />
    </Tabs>
  );
}
