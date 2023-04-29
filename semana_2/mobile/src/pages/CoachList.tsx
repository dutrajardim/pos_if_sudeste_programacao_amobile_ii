import React from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { BorderlessButton, RectButton, ScrollView } from "react-native-gesture-handler"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useIsFocused } from "@react-navigation/native"

import PageHeader from "../components/PageHeader"
import CoachItem from "../components/CoachItem"
import Feather from 'react-native-vector-icons/Feather'
import api from "../services/api"
import { Coach } from "../@types/app"

export default function CoachList(): JSX.Element {

  const [coaches, setCoaches] = React.useState([])
  const [favorites, setFavorites] = React.useState<number[]>([])
  const [isFilterVisible, setIsFilterVisible] = React.useState(false)
  const [subject, setSubject] = React.useState('')
  const [weekDay, setWeekDay] = React.useState('')
  const [time, setTime] = React.useState('')

  const isFocused = useIsFocused()

  React.useEffect(() => {
    AsyncStorage.getItem('favorites').then(response => setFavorites((JSON.parse(response || '[]').map(({ id }: Coach) => id))))
  }, [isFocused])

  React.useEffect(() => {
    if (coaches.length === 0) setIsFilterVisible(true)
  }, [coaches])

  const toggleFilterVisibility = () => setIsFilterVisible(!isFilterVisible)

  const handleFilterSubmit = () =>
    api.get('classes', { params: { subject, week_day: Number(weekDay), time } })
      .then(({ data }) => (setIsFilterVisible(false), setCoaches(data)))

  return (
    <View style={styles.container}>
      <PageHeader title="Coaches disponíveis" headerRight={<FilterHeader toggle={toggleFilterVisibility} />}>
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput style={styles.input} placeholder="Qual a matéria?" placeholderTextColor="#c1bccc" value={subject} onChangeText={text => setSubject(text)} />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput style={styles.input} placeholder="Qual o dia?" placeholderTextColor="#c1bccc" value={weekDay} onChangeText={text => setWeekDay(text)} />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput style={styles.input} placeholder="Qual o horário?" placeholderTextColor="#c1bccc" value={time} onChangeText={text => setTime(text)} />
              </View>
            </View>

            <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView style={styles.coachList} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {coaches.map((coach: Coach) => (
          <CoachItem key={coach.id} coach={coach} favorited={favorites.includes(coach.id)} />)
        )}
      </ScrollView>
    </View>
  )
}

function FilterHeader({ toggle }: { toggle: () => void }): JSX.Element {
  return (
    <BorderlessButton onPress={() => toggle()}>
      <Feather name="filter" size={20} color="#fff" />
    </BorderlessButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },
  coachList: {
    marginTop: -40,
  },
  searchForm: {
    marginBottom: 24,
  },
  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins-Regular'
  },
  input: {
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputBlock: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: '#04d361',
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'Archivo-Bold',
    fontSize: 16,
  }
})