import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ParamListBase } from '@react-navigation/native'

import landingImg from '../assets/images/landing.png'
import studyIcon from '../assets/images/icons/study.png'
import giveClassesIcon from '../assets/images/icons/give-classes.png'
import heartIcon from '../assets/images/icons/heart.png'
import api from '../services/api'


export default function Landing(): JSX.Element {

  const [totalConnections, setTotalConnections] = React.useState(0)

  const isFocused = useIsFocused()
  React.useEffect(() => {
    if (isFocused) api.get('connections').then(({ data }) => setTotalConnections(data.total))
  }, [isFocused])

  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  return <View style={styles.container}>
    <Image source={landingImg} style={styles.banner} />

    <Text style={styles.title}>
      Seja bem-vindo, {'\n'}
      <Text style={styles.titleBold}>
        O que deseja fazer?
      </Text>
    </Text>

    <View style={styles.buttonsContainer}>
      <RectButton onPress={() => navigate('Study')} style={[styles.button, styles.buttonPrimary]}>
        <Image source={studyIcon} />

        <Text style={styles.buttonText}>Estudar</Text>
      </RectButton>

      <RectButton onPress={() => navigate('GiveClasses')} style={[styles.button, styles.buttonSecondary]}>
        <Image source={giveClassesIcon} />

        <Text style={styles.buttonText}>Dar aulas</Text>
      </RectButton>
    </View>

    <Text style={styles.totalConnections}>
      Total de {totalConnections} conexões já realizadas {' '}

      <Image source={heartIcon} />
    </Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d9cdb',
    padding: 40
  },
  banner: {
    alignSelf: 'center',
    height: '50%',
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 14,
    fontFamily: 'Poppins-Regular'
  },
  titleBold: {
    fontFamily: 'Poppins-SemiBold'
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  button: {
    height: 115,
    width: '48%',
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
  },
  buttonPrimary: {
    backgroundColor: '#56ccf2',
  },
  buttonSecondary: {
    backgroundColor: '#04d361',
  },
  buttonText: {
    fontFamily: 'Archivo-Bold',
    color: '#fff',
    fontSize: 16
  },
  totalConnections: {
    fontFamily: 'Poppins-Regular',
    color: '#d4c2ff',
    fontSize: 12,
    maxWidth: 160,
    marginTop: 25
  }
})