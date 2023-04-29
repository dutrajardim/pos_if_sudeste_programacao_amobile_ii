import React from 'react'
import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import type { Coach } from '../@types/app'
import heartOutlineIcon from '../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../assets/images/icons/unfavorite.png'
import whatsappIcon from '../assets/images/icons/whatsapp.png'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'

// utils
const convertMinutesToHourString = (minutes: string) =>
  `${Math.floor(Number(minutes) / 60)}h ${Number(minutes) % 60}min`

interface Props {
  coach: Coach
  favorited: boolean
}

export default function CoachItem({ coach, favorited }: Props): JSX.Element {

  const [isFavorited, setIsFavorited] = React.useState(favorited)

  const handleToggleFavorite = async () => {
    let favorites = JSON.parse(await AsyncStorage.getItem('favorites') || '[]') as Coach[]

    favorites = isFavorited ?
      favorites.filter(({ id }) => id !== coach.id) :
      [...favorites, coach]

    setIsFavorited(!isFavorited)
    await AsyncStorage.setItem('favorites', JSON.stringify(favorites))
  }

  const handleLinkToWhatsapp = () => {
    api.post('connections', { coach_id: coach.id })
    Linking.openURL(`whatsapp://send?phone=${coach.whatsapp}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{ uri: coach.avatar }} style={styles.avatar} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{coach.name}</Text>
          <Text style={styles.subject}>{coach.subject}</Text>
        </View>


      </View>

      <Text style={styles.bio}>{coach.bio}</Text>
      <Text style={styles.time}>
        {convertMinutesToHourString(coach.from)} até {convertMinutesToHourString(coach.to)}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>
            {Number(coach.cost).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]} onPress={handleToggleFavorite}>
            {isFavorited ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6f0',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden'
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eee'
  },
  profileInfo: {
    marginLeft: 16
  },
  name: {
    fontFamily: 'Archivo-Bold',
    color: '#32264d',
    fontSize: 20
  },
  subject: {
    fontFamily: 'Poppins-Regular',
    color: '#6a6180',
    fontSize: 12,
    marginTop: 4
  },
  bio: {
    marginHorizontal: 24,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#6a6180'
  },
  time: {
    marginHorizontal: 24,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    lineHeight: 24,
    color: '#6a6180'
  },
  footer: {
    backgroundColor: '#fafafc',
    padding: 24,
    alignItems: 'center',
    marginTop: 24
  },
  price: {
    fontFamily: 'Poppins-Regular',
    color: '#6a6180',
    fontSize: 14,
  },
  priceValue: {
    fontFamily: 'Archivo-Bold',
    color: '#8257e5',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  favoriteButton: {
    backgroundColor: '#8257e5',
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  favorited: {
    backgroundColor: '#e33d3d',
  },
  contactButton: {
    backgroundColor: '#04d361',
    flex: 1,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  contactButtonText: {
    color: '#fff',
    fontFamily: 'Archivo-Bold',
    fontSize: 16,
    marginLeft: 16
  }
})