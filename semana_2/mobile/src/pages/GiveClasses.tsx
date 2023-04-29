import React from 'react'
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity } from 'react-native'

import givenClassesBackgroundImage from '../assets/images/give-classes-background.png'
import { useNavigation } from '@react-navigation/native';

export default function GiveClasses(): JSX.Element {

  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={givenClassesBackgroundImage} style={styles.content} resizeMode='contain'>
        <Text style={styles.title}>Quer ser um Coach?</Text>
        <Text style={styles.description}>Para começar, você precisa se cadastrar como coach na nossa plataforma web.</Text>
      </ImageBackground>

      <TouchableOpacity onPress={() => goBack()} style={styles.button}>
        <Text style={styles.buttonText}>Tudo bem</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d9cdb',
    padding: 40
  },

  content: {
    flex: 1,
    justifyContent: 'center'
  },

  title: {
    fontFamily: 'Archivo-Bold',
    color: '#fff',
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180,
  },

  description: {
    marginTop: 24,
    color: '#d4c2ff',
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Poppins-Regular',
    maxWidth: 240,
  },

  button: {
    marginVertical: 40,
    backgroundColor: '#04d361',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Archivo-Bold'
  }

})