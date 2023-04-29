import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import type { ParamListBase } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { PropsWithChildren } from 'react'

import backIcon from '../assets/images/icons/back.png'
import logoImg from '../assets/images/logo.png'

interface Props {
  title: string
  headerRight?: JSX.Element
}

export default function PageHeader({ title, children, headerRight }: PropsWithChildren<Props>): JSX.Element {

  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={() => navigate("Landing")}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>

      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#2d9cdb',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Archivo-Bold',
    color: '#fff',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 180,
    marginVertical: 40
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})