import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(10, 10, 10, 0.95)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingTop: Platform.OS === 'ios' ? 10 : 5,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -4,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? 'explore' : 'explore'}
              size={size || 26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? 'home' : 'home'}
              size={size || 26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={size + 4 || 30}
              color={focused ? '#10b981' : color}
            />
          ),
          tabBarLabel: '',
        }}
      />
      <Tabs.Screen
        name="memories"
        options={{
          title: 'Memories',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? 'grid-on' : 'grid-on'}
              size={size || 26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? 'person' : 'person-outline'}
              size={size || 26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

