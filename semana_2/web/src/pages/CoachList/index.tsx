import React from 'react'

import PageHeader from '../../components/PageHeader'
import CoachItem from '../../components/CoachItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import './styles.css'
import api from '../../services/api'

export default function CoachList() {
  const [subject, setSubject] = React.useState('')
  const [week_day, setWeekDay] = React.useState('')
  const [time, setTime] = React.useState('')
  const [coaches, setCoaches] = React.useState([])

  // React.useEffect(() => {}, [subject, week_day, time])

  const searchCoachs = async (e: React.FormEvent) => {
    e.preventDefault()

    api.get('classes', { params: { subject, week_day, time } })
      .then(({ data }) => setCoaches(data))
      .catch(err => console.log(err))
  }

  return (
    <div id="page-coach-list" className="container">
      <PageHeader title="Estes são os coachs disponíveis.">
        <form id="search-coaches" onSubmit={searchCoachs}>

          <Select
            name='subject'
            label='Matéria'
            defaultValue={subject}
            onChange={e => { setSubject(e.target.value) }}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciáncias', label: 'Ciáncias' },
              { value: 'Educação física', label: 'Educação física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Histária', label: 'Histária' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Portugués', label: 'Portugués' },
              { value: 'Química', label: 'Química' }
            ]} />

          <Select
            name="week_day"
            label="Dia da semana"
            defaultValue={week_day}
            onChange={e => { setWeekDay(e.target.value) }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' }
            ]} />
          <Input type="time" name="time" label="Hora" value={time} onChange={e => { setTime(e.target.value) }} />

          <button type="submit">Buscar</button>

        </form>
      </PageHeader>

      <main>
        {coaches.map((coach, key) => <CoachItem coach={coach} key={key} />)}
      </main>
    </div>
  )
}