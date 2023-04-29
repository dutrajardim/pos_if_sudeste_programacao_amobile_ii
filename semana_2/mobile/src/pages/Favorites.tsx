import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import PageHeader from '../components/PageHeader'
import CoachItem from '../components/CoachItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Coach } from '../@types/app'
import { useFocusEffect } from '@react-navigation/native'

export default function Favorites(): JSX.Element {

  const [favorites, setFavorites] = React.useState<Coach[]>([])

  useFocusEffect(React.useCallback(() => {
    AsyncStorage.getItem('favorites').then(response => {
      setFavorites(JSON.parse(response || '[]'))
    })
  }, []))

  return (
    <View style={styles.container}>
      <PageHeader title='Meus coaches favoritos' />

      <ScrollView style={styles.coachList} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {favorites.map((coach: Coach) => (
          <CoachItem key={coach.id} coach={coach} favorited={true} />)
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },
  coachList: {
    marginTop: -40,
  }
})