import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'


import CoachList from '../pages/CoachList'
import Favorites from '../pages/Favorites'

const { Navigator, Screen } = createBottomTabNavigator()

export default function StudyTabs(): JSX.Element {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarItemStyle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
        tabBarStyle: { elevation: 0, shadowOpacity: 0, height: 64 },
        tabBarIconStyle: { flex: 0, width: 20, height: 20 },
        tabBarLabelStyle: { fontFamily: 'Archivo-Bold', fontSize: 13, marginLeft: 16 },
        tabBarInactiveBackgroundColor: '#fafafc',
        tabBarActiveBackgroundColor: '#ebebf5',
        tabBarInactiveTintColor: '#c1bccc',
        tabBarActiveTintColor: '#32264d',
      }}>

      <Screen
        name="CoachList"
        component={CoachList}
        options={{ tabBarLabel: 'Coaches', tabBarIcon: ({ color, size, focused }) => <Ionicons name="ios-easel" size={size} color={focused ? '#8257e5' : color} /> }} />

      <Screen
        name="Favorites"
        component={Favorites}
        options={{ tabBarLabel: 'Favoritos', tabBarIcon: ({ color, size, focused }) => <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color} /> }} />

    </Navigator>
  )
}