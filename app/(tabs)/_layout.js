import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { theme } from '../../constants/theme'

export default function TabLayout() {
  return (
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.subText,

          tabBarHideOnKeyboard: true,

          tabBarStyle: {
            backgroundColor: theme.colors.bgLight,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,

            height: 130,
            paddingBottom: 12,
            paddingTop: 8,
          },

          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 4,
          },
        }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      {/* Gallery Tab */}
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ color }) => (
            <Ionicons name="image" size={24} color={color} />
          ),
        }}
      />

      {/* Mood Tab */}
      <Tabs.Screen
        name="Mood"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color }) => (
            <Ionicons name="happy" size={24} color={color} />
          ),
        }}
      />

      {/* Calendar Tab */}
      <Tabs.Screen
        name="CalendarNotes"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />

      {/* Settings Tab */}
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />

      {/* Hidden Tabs - Accessible via navigation */}
      <Tabs.Screen
        name="Videos"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="Travel"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="Wedding"
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}